import { useEffect, useState } from "react";
import { fetchAllPokemon, fetchPokemonDetailsByName, fetchEvolutionChainById, fetchPokemonSpeciesByName } from "./api";

const MAX_MOVES_TO_SHOW = 4;

const DetailsList = ({ title, items }) => (
    <div>
        <div className={'pokedex__details-header'}>{ title }</div>
        <ul className={'pokedex__details-list'}>
            {items.map(item => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)

const EvoChain = ({ chain }) => {
    return (
        <div className={'pokedex__details-evos-chain'}>
            <div className={'pokedex__details-evos-chain-name'}>
                { chain.species.name }
            </div>
            { chain.evolves_to.length > 0 && (
                <div className={'pokedex__details-evos-chain-evos'}>
                    { chain.evolves_to.map(evo => <EvoChain key={chain.species.name} chain={ evo } />) }
                </div>
            )}
        </div>
    )
}

function App() {
    const [pokemon, setPokemon] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [fetchingPokemonDetails, setFetchingPokemonDetails] = useState(false);
    const [pokemonDetails, setPokemonDetails] = useState()
    const [detailsError, setDetailsError] = useState('');

    useEffect(() => {
        setPokemonDetails();
        setDetailsError('');

        const fetchPokemon = async () => {
            const {results: pokemonList} = await fetchAllPokemon()
            setPokemon(
                searchValue
                    ? pokemonList.filter(monster => monster.name.includes(searchValue))
                    : pokemonList
            )
        }

        fetchPokemon()
            .catch(() => {
                setPokemon([]);
                setDetailsError('Dang, Looks like this pokemon got away...Please try again later.');
            });
    }, [searchValue])

    const onSearchValueChange = (event) => {
        const value = event.target.value.trim();
        setSearchValue(value)
    }

    const onGetDetails = (name) => async () => {
        setFetchingPokemonDetails(true);

        try {
            // must retrieve species first to get evolution chain id
            const { evolution_chain } = await fetchPokemonSpeciesByName(name);
            const evoChainId = evolution_chain.url.split('/').filter(Boolean).pop();
            if (!evoChainId) throw new Error('No evolution chain id found');

            const [details, evolutionChain] = await Promise.all([
                fetchPokemonDetailsByName(name),
                fetchEvolutionChainById(evoChainId),
            ]);

            setPokemonDetails({
                name: name,
                types: (details.types || []).map(type => type.type.name),
                moves: (details.moves || []).slice(0, MAX_MOVES_TO_SHOW).map(move => move.move.name),
                evolutionChain,
            });
        } catch {
            setDetailsError('Dang, Looks like this pokemon got away...Please try again later.');
        } finally {
            setFetchingPokemonDetails(false);
        }
    }

    return (
        <div className={'pokedex__container'}>
            <div className={'pokedex__search-input'}>
                <input value={searchValue} onChange={onSearchValueChange} placeholder={'Search Pokemon'}/>
            </div>
            <div className={'pokedex__content'}>
                {pokemon.length > 0 && (
                    <div className={'pokedex__search-results'}>
                        {
                            pokemon.map(monster => {
                                return (
                                    <div className={'pokedex__list-item'} key={monster.name}>
                                        <div>
                                            {monster.name}
                                        </div>
                                        <button onClick={onGetDetails(monster.name)}>Get Details</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
                {
                    fetchingPokemonDetails && (
                        <div className={'pokedex__details pokedex__details-loading'}>
                            Loading...
                        </div>
                    )
                }
                {
                    pokemonDetails && !fetchingPokemonDetails && (
                        <div className={'pokedex__details'}>
                            <h2 className={'pokedex__details-header'}>{ pokemonDetails.name }</h2>
                            <div className={'pokedex__details-col-2'}>
                                <DetailsList title={'Types'} items={pokemonDetails.types} />
                                <DetailsList title={'Moves'} items={pokemonDetails.moves} />
                            </div>

                            <div>
                                <div className={'pokedex__details-header pokedex__details-header-evos'}>Evolutions</div>
                                <EvoChain chain={ pokemonDetails.evolutionChain.chain } />
                            </div>
                        </div>
                    )
                }
                {
                    detailsError && !fetchingPokemonDetails && (
                        <div className={'pokedex__details pokedex__details-error'}>
                            { detailsError }
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;
