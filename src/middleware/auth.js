
// import jwt_decode from "jwt-decode";
// import moment from "moment";

export const isAuth =  () => {
    if (localStorage.getItem('token') !== null) {
        // try {
        //     const token = localStorage.getItem('token')
        //     const decoded = await jwt_decode(token);
        //     const {exp} = decoded
        //     const experian = moment(exp * 1000).format()
        //     console.log(experian,token,decoded,);
        //     if(experian < moment(Date.now()).format()){
        //         console.log(decode)
        //         return true
        //     }else{
                
        //         return false
        //     }
            
        // } catch (error) {
        //     console.log(error + ' -> token invalid')
        //     return false
        // }
        return true
       
    }
    console.log('erro')
    return false
}