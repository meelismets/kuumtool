# Kuumtool rest api

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`.
The application will automatically reload if you change any of the source files.


## API
### GET /api/spots
Returns list of all spots with data for frontend
Example:
`/api/spots`

### GET /api/spots/{spotId:numeric}/simulated/{0|1}
Turns off or on simulated data for spot with id spotId. Example:
`/api/spots/7/simulated/1`

### GET /api/spots/{spotId:numeric}/volume/{volume:numeric}
Sets volume for spot with id spotId. Example:
`/api/spots/7/volume/50`

### GET /api/spots/{spotId:numeric}/movement/{movement:numeric}
Sets movement for spot with id spotId. Example:
`/api/spots/7/movement/99`