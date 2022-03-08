import { api } from "./config";

export default {
    getByName( name )
    {
        return api.get( `pokemon/${ name }` );
    }
};