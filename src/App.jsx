import React, { cloneElement, useEffect, useRef, useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, List, ListItem, ListItemIcon, ListItemText, styled, TextField, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import LoadingButton from '@mui/lab/LoadingButton';
import pokemon from './api/pokemon';

const bull = (
	<Box
		component="span"
		sx={ { display: 'inline-block', mx: '2px', transform: 'scale(0.8)' } }
	>
		•
	</Box>
);

const Demo = styled( 'div' )( ( { theme } ) => ( {
	backgroundColor: theme.palette.background.paper,
} ) );

export default function App()
{
	const [ pokemonData, setPokemonData ] = useState( {} );
	const [ loadingState, setLoadingState ] = useState( '' );
	const [ dense, setDense ] = useState( false );
	const [ secondary, setSecondary ] = useState( false );

	const searchValue = useRef( '' );

	const getPokemon = ( name ) =>
	{
		pokemon.getByName( name )
			.then( res =>
			{
				setPokemonData( res.data );
				setLoadingState( 'LOADED' );
			} )
			.catch( err =>
			{
				console.log( err );
				setLoadingState( 'NO DATA' );
			} );
	};

	const handleSearch = () =>
	{
		setLoadingState( 'LOADING' );

		if ( searchValue.current.value )
		{
			getPokemon( searchValue.current.value );
			searchValue.current.value = '';
		}
		else
		{
			setLoadingState( 'NO DATA' );
		}

	};

	return (
		<Container fixed className='my-8'>
			<Box>
				<Grid container spacing={ 2 }>
					<Grid item xs={ 8 }>
						<TextField
							fullWidth
							id="outlined-basic"
							label="Type Pokemon Name Here"
							variant="outlined"
							size='small'
							inputRef={ searchValue }
						/>
					</Grid>
					<Grid item xs={ 4 }>
						<Button onClick={ handleSearch } fullWidth
							variant="outlined"
						>
							Search
						</Button>
					</Grid>
				</Grid>
			</Box>
			{
				loadingState === 'LOADING'
					?
					<React.Fragment>
						<LoadingButton loading></LoadingButton>
					</React.Fragment>
					:
					null
			}
			{
				loadingState === 'NO DATA'
					?
					<React.Fragment>
						<Typography variant={ 'h5' }>No data to display</Typography>
					</React.Fragment>
					:
					null
			}
			{
				loadingState === 'LOADED'
					?
					<Card sx={ { minWidth: 275 } }>
						<CardContent>
							<Demo>

								<Box>
									<Grid container spacing={ 2 }>
										<Grid item xs={ 2 }>
											<CardMedia
												component="img"
												height="194"
												image={ pokemonData.sprites?.front_default }
												alt={ pokemonData.name }
											/></Grid>
										<Grid item xs={ 10 }>
											<Typography variant='h2'>{ pokemonData.name }</Typography>
										</Grid>
									</Grid>

								</Box>

								<Typography variant='h4'>Type(s)</Typography>
								<List dense={ dense }>
									{ pokemonData.types?.map( t => (
										<ListItem key={ t.type.name }>
											<ListItemIcon>
												<CircleIcon />
											</ListItemIcon>
											<ListItemText
												primary={ `${ t.type.name }` }
												secondary={ secondary ? 'Secondary text' : null }
											/>
										</ListItem>
									) ) }
								</List>

								<Typography variant='h4'>Stats</Typography>
								<List dense={ dense }>
									<ListItem>
										<ListItemIcon>
											<CircleIcon />
										</ListItemIcon>
										<ListItemText
											primary={ `height (m): ${ pokemonData.height / 10 }` }
											secondary={ secondary ? 'Secondary text' : null }
										/>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<CircleIcon />
										</ListItemIcon>
										<ListItemText
											primary={ `weight (kg): ${ pokemonData.weight / 10 }` }
											secondary={ secondary ? 'Secondary text' : null }
										/>
									</ListItem>
									{/* { pokemonData.stats?.map( s => (
								<ListItem key={ s.stat.name }>
									<ListItemIcon>
										<CircleIcon />
									</ListItemIcon>
									<ListItemText
										primary={ `${ s.stat.name } [${ s.base_stat }]` }
										secondary={ secondary ? 'Secondary text' : null }
									/>
								</ListItem>
							) ) } */}
								</List>

								<Typography variant='h4'>Abilities</Typography>
								<List dense={ dense }>
									{ pokemonData.abilities?.map( a => (
										<ListItem key={ a.ability.name }>
											<ListItemIcon>
												<CircleIcon />
											</ListItemIcon>
											<ListItemText
												primary={ a.ability.name }
												secondary={ secondary ? 'Secondary text' : null }
											/>
										</ListItem>
									) ) }
								</List>


							</Demo>
						</CardContent>
					</Card>
					:
					null
			}
		</Container>
	);
}
