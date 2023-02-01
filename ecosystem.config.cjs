const data = ( port, mode ) => {
    return {
        name: `PORT = ${port}`,
        script: './server.js',
        instances: 1,
        exec_mode: mode,
        args: `-p ${ port }`,
        autorestart: true,
        watch: [ 'enviroment/.env', 'routes', 'sockets', 'database', 'models', 'middlewares', 'utils' ],
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }
}
const dataClusters = () => {
    const apps = [];
    for( let i = 0; i < 1; i++ ) {
        if( i === 0 ) apps.push( data( 8080, 'fork' ) )
    }
    return apps
}

module.exports = {
    apps: dataClusters()
};





