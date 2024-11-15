// export function createPiniaMiddleware() {
//     return (context) => {
//         context.store.$onAction(({name, store, args, after, onError}) => {
//             console.log(`Actions "${name}" in store "${store.$id}" with args`, args)
//         });

//         //proteksi berdasarkan user role
//         const userRole = localStorage.getItem("role");
//         const protectedActions = ['addItem', 'updateItem', 'deleteItem'];
//         if (protectedActions = ['addItem', 'updateItem', 'deleteItem'] && userRole !== 'admin') {
//             console.error('Unauthorize action "${name}" attempted by role "${userRole}"')
//             throw new Error("UnAuthorize Action")
//         }
//         after ((result) => {
//             console.log('Action "${name}" completed with result:', result)
//         });
//         onError ((error) =>{
//             console.error('Actions "${name}" failed with error', error)
//         })
//     }
// }

export function createPiniaMiddleware() {
    return (context) => {
        context.store.$onAction(({ name, store, args, after, onError }) => {
            console.log(`Action "${name}" in store "${store.$id}" with args:`, args);
// Proteksi state berdasarkan user role
const userRole = localStorage.getItem('role') || 'admin';
const protectedActions = ['addItem', 'updateItem', 'deleteItem'];
if (protectedActions.includes(name) && userRole !== 'admin') {
    console.error(`Unauthorized action "${name}" attempted by role "${userRole}"`);
    throw new Error('Unauthorized');
}
after((result) => {
    console.log(`Action "${name}" completed with result:`, result);
});
onError((error) => {
    console.error(`Action "${name}" failed with error:`, error);
});

});
};
    
}

// export function createPiniaMiddleware() {
//     return (context) => {
//         context.store.$onAction(({ name, store, args, after, onError }) => {
//             console.log(`Action "${name}" in store "${store.$id}" with args:`, args);

//             // Proteksi state berdasarkan user role
//             const userRole = localStorage.getItem('role');
//             const protectedActions = ['addItem', 'updateItem', 'deleteItem'];

//             if (protectedActions.includes(name) && userRole !== 'admin') {
//                 console.error(`Unauthorized action "${name}" attempted by role "${userRole}"`);
//                 throw new Error('Unauthorized'); // Pesan error akan dilempar di sini
//             }

//             // Mengecek apakah `after` didefinisikan sebelum memanggilnya
//             if (after) {
//                 after((result) => {
//                     console.log(`Action "${name}" completed with result:`, result);
//                 });
//             }

//             // Mengecek apakah `onError` didefinisikan sebelum memanggilnya
//             if (onError) {
//                 onError((error) => {
//                     console.error(`Action "${name}" failed with error:`, error);
//                 });
//             }
//         });
//     };
// }
