// import {
//   arrayUnion,
//   updateDoc,
// } from "firebase/firestore"
// import { currTime } from "./utils"

// const confessCrush = async ({ remiteneteRefParam, destinatarioRefParam, objetoRemitenteParam, objetoDestinatarioParam }) => {
//     //Verificar si hay match viendo si existe el perfil en los likes del remitente
//     await updateDoc((remiteneteRefParam), {
//         matchesCon: arrayUnion(objetoDestinatarioParam.username),
//         hora: currTime
//     })
//     await updateDoc((destinatarioRefParam), {
//         matchesCon: arrayUnion(objetoRemitenteParam.username),
//         hora: currTime
//     })
// }

// export { confessCrush }