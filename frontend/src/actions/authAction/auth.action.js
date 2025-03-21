import { toast } from "react-toastify"
import axios from "../../utils/axiosConfig"
import { 
    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD_SUCCESS,
    LOGIN_ERROR,
    LOGIN_SUCCESS, 
    LOGOUT_ERROR, 
    LOGOUT_SUCCESS, 
    REGISTER_ERROR, 
    REGISTER_SUCCESS,
    RESET_PASSWORD_ERROR,
    RESET_PASSWORD_SUCCESS,
    USER_AUTORISED_ERROR,
    USER_AUTORISED_LOADED,
    USER_AUTORISED_LOADING
} from "./type.auth.action";


export const loadUser = () => async (dispatch) => {
    dispatch({ type: USER_AUTORISED_LOADING });

    try {
        const res = await axios.get('/userAutorised', { withCredentials: true });

        if (!res.data?.id) {
            throw new Error('Utilisateur non trouvé');
        }

        const userRes = await axios.get(`/users/${res.data.id}`, { withCredentials: true });

        dispatch({
            type: USER_AUTORISED_LOADED,
            payload: userRes.data
        });

    } catch (err) {
        dispatch({
            type: USER_AUTORISED_ERROR,
            payload: err.response?.data || { error: 'Une erreur est survenue' }
        });
    }
};


export const login = ({ email, password }) => async (dispatch) => {
    dispatch({ type: USER_AUTORISED_LOADING });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true // Important pour envoyer les cookies avec la requête
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/auth/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
        toast.success('Connexion réussie avec succès!');
        window.location.href = '/'
    } catch (err) {
        dispatch({
            type: LOGIN_ERROR,
            payload: err.response?.data || { error: 'Une erreur est survenue' }
        });
        toast.error("vous avez une erreur de connexion!");
    }
};



export const register = ({name, email, password, confirmPassword}) => async dispatch=>{
    dispatch({type:USER_AUTORISED_LOADING})
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
    };
    
    const body = JSON.stringify({ name, email, password, confirmPassword});

    try{
        const res = await axios.post('/auth/register',body, config)
        
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        toast.success("compte créé avec succès un email d'activation a été envoyé à "+email)
    }catch(err){
        toast.error("vous avez une erreur d'enregistrement ")
        dispatch({
            type:REGISTER_ERROR,
            payload:err.response.data
        })
    }
}

export const forgotPassword = ({email}) => async dispatch =>{
    dispatch({type:USER_AUTORISED_LOADING})
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email});

    try{
        const res = await axios.post('/auth/request-password-reset',body, config)
        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload:res.data
        })
        
        toast.success("Vous avez reçue un mail de rénitialisation de mot de passe")
    }catch(err){
        dispatch({
            type:FORGOT_PASSWORD_ERROR,
            payload:err.response.data
        })
        
        toast.error("Une erreur c'est produit lors de l'envoir du mail!");
    }
}



export const resetPassword = (token, { password, confirmPassword }) => async dispatch => {
    dispatch({ type: USER_AUTORISED_LOADING })
    const confing = {
        headers: {
            'content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ password, confirmPassword })

    try {

        const res = await axios.post(`/auth/reset-password/${token}`, body, confing)
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: res.data
        })

        toast.success("le mot de passe à été rénitialisé avec succès")
        //window.location.href = '/login'

    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_ERROR,
            payload: err.response.data
        })
        toast.error("Une erreur c'est produit lors de la rénitialisation du mot de passe!");
    }
}


export const logout = () => async dispatch => {
    try {
        const res = await axios.post('/auth/logout', {}, { withCredentials: true }); 

        dispatch({
            type: LOGOUT_SUCCESS,
            payload: res.data
        });

        toast.success("Déconnexion réussie");
        window.location.href = '/';
    } catch (err) {
        dispatch({
            type: LOGOUT_ERROR,
            payload: err.response?.data || "Erreur inconnue"
        });
        
        toast.error("Erreur lors de la déconnexion");
    }
};



// export const logout = ()=> async dispatch =>{
//     try{
//         const res = await axios.post('/auth/logout')
//         dispatch({
//             type:LOGOUT_SUCCESS,
//             payload:res.data
//         })
//         toast.success("déconnexion réussite")
//         window.location.href = '/'
//     }catch(err){
//         dispatch({
//             type:LOGOUT_ERROR,
//             payload:err.response.data
//         })
//         console.log("deconnexion errot: "+JSON.stringify(err.response.data))
//         toast.error("Erreur lors de la déconnexion")
//     }
// }