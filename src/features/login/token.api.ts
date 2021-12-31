import { signInWithEmailAndPassword } from "@firebase/auth";
import swal from "sweetalert";
import { auth } from "../../firebase";
import { Token } from "./token";


export const getToken = async (email: string, password: string): Promise<Token> => {
    // Error handling for firebase authentication on login
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return await userCredential.user.getIdTokenResult(true)
    }catch(error: any){
        const errorCode = error.code.slice(5);
        swal("Uh oh!", errorCode, "error");
        return errorCode;
    }

}
