// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     errorElement: <ErrorBoundary />,
//     children: [
//       {
//         path: "/",
//         element: <StudioList />,
//       },
//       {
//         path: "/studio/:studioId",
//         element: <SingleStudio />,
//       },
//       {
//         path: "/studio/create",
//         element: (
//           <AdminGuard>
//             <AddStudio />
//           </AdminGuard>
//         ),
//       },
//       {
//         path: "/studio/update/:studioId",
//         element: (
//           <AdminGuard>
//             <UpdateStudio />
//           </AdminGuard>
//         ),
//       },
//       {
//         path: "/media",
//         element: <MediaList />,
//       },
//       {
//         path: "/media/:mediaId",
//         element: <SingleMedia />,
//       },
//       {
//         path: "/media/create",
//         element: (
//           <AdminGuard>
//             <AddMedia />
//           </AdminGuard>
//         ),
//       },
//       {
//         path: "/media/update/:mediaId",
//         element: (
//           <AdminGuard>
//             <UpdateMedia />
//           </AdminGuard>
//         ),
//       },
//       {
//         path: "/user/adminupdate/:userId",
//         element: (
//           <AdminGuard>
//             <UpdateAdmin />
//           </AdminGuard>
//         ),
//       },
//       {
//         path: "/user",
//         element: (
//           <AdminGuard>
//             <UserList />
//           </AdminGuard>
//         ),
//       },
//       {
//         path: "/user/:userId",
//         element: (
//           <CurrentUserOnlyGuard>
//             <SingleUser />
//           </CurrentUserOnlyGuard>
//         ),
//       },
//       {
//         path: "/user/update/:userId",
//         element: (
//           <CurrentUserOnlyGuard>
//             <UpdateUser />
//           </CurrentUserOnlyGuard>
//         ),
//       },
//       {
//         path: "/user/changePassword/:userId",
//         element: (
//           <CurrentUserOnlyGuard>
//             <UpdatePassword />
//           </CurrentUserOnlyGuard>
//         ),
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
// ]);
