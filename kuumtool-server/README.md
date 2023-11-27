<a href="https://github.com#gh-light-mode-only">
    <img src="../graphics/logo_black.png">
</a>
<a href="https://github.com#gh-dark-mode-only">
    <img src="../graphics/logo_white.png">
</a>
### Out of box product that runs on Raspberry Pi is accessible through web browser: 
`http://10.42.0.1`

To do so, you need to find WIFI SSID `kuumtool` and connect to it. Password is `kuumtool`.
Next connect your arduino sensors to same wifi network, and use rest API to send data to server.

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

### GET /api/spots/{spotId:numeric}/rename/{name:string}
Renames spot with id spotId to name. Example:
`/api/spots/7/rename/Alice`