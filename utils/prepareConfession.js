// import { firestore } from "../firebase/base";
// import {
//   arrayUnion,
//   collection,
//   doc,
//   getDocs,
//   query,
//   setDoc,
//   updateDoc,
//   where,
// } from "firebase/firestore";
// import { nm } from "./utils";
// import { confessCrush } from "./confessCrush";

// const prepareConfession = async ({ ownerParam, 
//     mainSubjectParam, 
//     // errParam,
//     // setErrParam, 
//     setNotToParam, 
//     setOpenNotifParam, 
//     likesDelRemitenteParam,
//     objetoRemitenteParam,
//     objetoDestinatarioParam }) => {
        
//     // let succesMsg = ""
//     // setErrParam("");
//     if (mainSubjectParam[0] != "@") {
//         //Si el usuario no ingreso el "@" lo ingresamos nosotros.
//         mainSubjectParam = `@${mainSubjectParam}`;
//     }    
//     if (objetoDestinatarioParam) {
//         await updateDoc(doc(firestore, "users", objetoDestinatarioParam.email), {
//         likes: arrayUnion(ownerParam.username),
//         });
//         let docID = `confesion${nm}`;
//         await setDoc(doc(firestore, "confesiones", docID), {
//             remitente: ownerParam.username,
//             destinatario: mainSubjectParam,
//             cardID: docID,
//         });
//         await setDoc((destinatarioRef), {
//             potencialMatch: true
//         });
//         await setDoc((remiteneteRef), {
//             potencialMatch: true
//         });
//         //***************************
//         console.log(mainSubjectParam)
//         //Ruta hacia los docs en la base de datos
//         const destinatarioRef = doc(
//             firestore, "matches", `${objetoRemitenteParam.username} - ${objetoDestinatario.username}`
//         )
//         const remiteneteRef = doc(
//             firestore, "matches", `${objetoDestinatario.username} - ${objetoRemitenteParam.username}`
//         )
//         //***********************************************************************************
//         if (likesDelRemitenteParam.includes(objetoDestinatarioParam.username)) {
//             confessCrush(remiteneteRef, destinatarioRef, objetoRemitenteParamParam, objetoDestinatarioParam)
//             //************
//             setNotToParam(objetoDestinatarioParam.username)
//             setOpenNotifParam(true)
//             // succesMsg = "matchExitoso"
//             // return succesMsg
//         }
//     } else {
//         // setErrParam("El usuario ingresado no existe, vuelve a intentar.")
//         console.log("usuario incorrecto")
//     }
// }

// export { prepareConfession }