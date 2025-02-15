// import { useState, useMemo } from 'react';
// import * as XLSX from 'xlsx';
// import AddEditUserModal from '../components/Modals/RolesModales/AddEditRoleModal';
// import ViewRoleModal from '../components/Modals/RolesModales/ViewRoleModal';
// import { useTheme } from '../context/ThemeContext';
// import { FaPencil, FaRegEye } from 'react-icons/fa6';
// import { RiDeleteBin6Line } from 'react-icons/ri';
// import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
// import DeleteRoleModal from '../components/Modals/RolesModales/DeleteRoleModal';
// import LoadingLoader from "../components/LoadingLoader"
// import { useDispatch, useSelector } from 'react-redux';
// import { addRole, deleteRole, editeRole } from '../actions/roleAction/role.action';

// const Roles = () => {
//   const { theme } = useTheme()
//   const rolesState = useSelector(state => state.roles)
//   const dispatch = useDispatch()
//   const { rolesData, loading } = rolesState
//   const [roles, setRoles] = useState(rolesData);
//   const [showModal, setShowModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [currentRole, setCurrentRole] = useState(null);
//   const [currentRoleId, setCurrentRoleId] = useState(null);
//   const [viewRole, setViewRole] = useState(null);
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(2);




//   // Gestion des données filtrées
//   const filteredRoles = useMemo(() => {
//     return roles?.filter(role =>
//       role.name?.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [roles, search]);

//   const paginatedRoles = useMemo(() => {
//     const start = page * rowsPerPage;
//     return filteredRoles?.slice(start, start + rowsPerPage);
//   }, [filteredRoles, page, rowsPerPage]);

//   // Gestion de la recherche et de la pagination
//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setPage(0); // Réinitialiser la pagination lors de la recherche
//   };

//   // Fonctions de gestion des utilisateurs
//   const handleAdd = () => {
//     setCurrentRole({ name: ''});
//     setShowModal(true);
//   };


//   const handleEdit = (role) => {
//     setCurrentRole(role);
//     setShowModal(true);
//   };

//   const handleView = (role) => {
//     setViewRole(role);
//     setShowViewModal(true);
//   };

//   const handleShowDelete = (id) => {
//     setCurrentRoleId(id)
//     setShowDeleteModal(true)
//   }

//   const handleDelete = (id) => {
//     setRoles(prevRoles => prevRoles.filter(role => role._id !== id));
//     dispatch(deleteRole(id))
//     setShowDeleteModal(false)
//   };

//   const handleSave = (role) => {
//     const {name} = role
//     if (role._id) {
//       setRoles(prevRoles => prevRoles.map(r => (r._id === role._id ? role : r)));
//       dispatch(editeRole(role._id, {name}))
//     } else {
//       setRoles(prevRoles => [...prevRoles, role]);
//       dispatch(addRole({name}))
//     }
//     setShowModal(false);
//   };

//   const handleExport = () => {
//     const ws = XLSX.utils.json_to_sheet(roles);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Roles');
//     XLSX.writeFile(wb, 'roles.xlsx');
//   };
//   // Calcul de la plage des entrées visibles
//   const start = page * rowsPerPage + 1;
//   const end = Math.min((page + 1) * rowsPerPage, filteredRoles?.length);

//   return (
//     loading
//       ?
//       <div className='px-3 md:px-8 flex items-center flex-col justify-center h-screen'>
//         <LoadingLoader />
//         <p className='text-xl text-gray-500 text-center mt-3 '>patienté quelque minutes le temps que les données chargent</p>
//       </div>
//       :
//       <div className="w-full">

//         <div className=' mb-8 flex items-center justify-between flex-wrap gap-2'>
//           <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} `}>Tous les Roles</h2>
//           <h4 className='text-base'><span className='text-gray-500 cursor-pointer'>Tableau de bord / </span><span className='text-purple-700'>Roles</span></h4>
//         </div>
//         <div className="flex justify-between mb-4 flex-wrap gap-3">
//           <button className='px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-green-700' onClick={handleAdd}>Ajouter un role</button>
//           <input value={search} className='px-3 py-2 text-gray-500 text-lg border border-gray-400 rounded-lg outline-none bg-transparent' placeholder="Recherche..." onChange={handleSearchChange} />
//           <button className='px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-blue-700' onClick={handleExport}>Exporter vers Excel</button>
//         </div>

//         <div className={` ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} overflow-x-auto rounded-md shadow-2xl text-gray-500`}>
//           <table className='w-1400px xl:w-full'>
//             <thead>
//               <tr>
//                 <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>ID</th>
//                 <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Nom</th>
//                 <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedRoles?.map((role, index) => (
//                 <tr key={role._id}>
//                   <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{start + index}</td>
//                   <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{role.name}</td>
//                   <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>
//                     <button className="bg-transparent  px-2 py-1 m-1" onClick={() => handleEdit(role)}><span className='text-gray-500'><FaPencil /></span></button>
//                     <button className="bg-transparent  px-2 py-1 m-1" onClick={() => handleShowDelete(role._id)}><span className='text-red-800'><RiDeleteBin6Line /></span></button>
//                     <button className="bg-transparent  px-2 py-1 m-1" onClick={() => handleView(role)}><span className='text-gray-500'><FaRegEye /></span></button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between mt-4 gap-2 flex-wrap">
//           <select
//             value={rowsPerPage}
//             onChange={(e) => {
//               setRowsPerPage(parseInt(e.target.value, 10));
//               setPage(0);
//             }}
//             className="border border-gray-300 p-2 rounded-md bg-gray-300 shadow-2xl"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={15}>15</option>
//           </select>
//           <div>
//             <span className="text-sm text-gray-700 font-semibold">
//               Affichage de {start} à {end} sur {filteredRoles?.length} entrées
//             </span>
//           </div>
//           <div className='flex items-center justify-between text-white'>
//             <button className="bg-blue-700 flex items-center justify-between rounded-md hover:bg-opacity-80 px-4 mr-3 py-2" disabled={page === 0} onClick={() => setPage(page - 1)}><span><IoChevronBackSharp /></span>Précédent</button>
//             <button className="bg-blue-700 flex items-center justify-between rounded-md hover:bg-opacity-80 px-4 py-2" disabled={(page + 1) * rowsPerPage >= filteredRoles?.length} onClick={() => setPage(page + 1)}>Suivant <span><IoChevronForwardSharp /></span> </button>
//           </div>

//         </div>

//         <AddEditUserModal
//           show={showModal}
//           role={currentRole}
//           onSave={handleSave}
//           onClose={() => setShowModal(false)}
//         />

//         <DeleteRoleModal
//           show={showDeleteModal}
//           currentRoleId={currentRoleId}
//           onDelete={handleDelete}
//           onClose={() => setShowDeleteModal(false)}
//         />

//         <ViewRoleModal
//           show={showViewModal}
//           role={viewRole}
//           onClose={() => setShowViewModal(false)}
//         />
//       </div>
//   );
// };

// export default Roles;


import { useState, useMemo, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FaPencil, FaRegEye } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';

import AddEditUserModal from '../components/Modals/RolesModales/AddEditRoleModal';
import ViewRoleModal from '../components/Modals/RolesModales/ViewRoleModal';
import DeleteRoleModal from '../components/Modals/RolesModales/DeleteRoleModal';
import LoadingLoader from "../components/LoadingLoader";

import { addRole, deleteRole, editeRole, getAllRoles } from '../actions/roleAction/role.action';


const Roles = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  
  // État pour gérer les rôles
  const rolesState = useSelector(state => state.roles);
  const { rolesData, loading } = rolesState;
  const [roles, setRoles] = useState([]);
  
  // État pour gérer les modales
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // État pour gérer le rôle actuel
  const [currentRole, setCurrentRole] = useState(null);
  const [currentRoleId, setCurrentRoleId] = useState(null);
  const [viewRole, setViewRole] = useState(null);
  
  // État pour gérer la recherche et la pagination
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // Charger les rôles lorsque le composant est monté
  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  // Mettre à jour les rôles locaux lorsque les données des rôles changent
  useEffect(() => {
    setRoles(rolesData);
  }, [rolesData]);

  // Filtrer les rôles en fonction de la recherche
  const filteredRoles = useMemo(() => {
    return roles?.filter(role =>
      role.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [roles, search]);

  // Paginer les rôles filtrés
  const paginatedRoles = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredRoles?.slice(start, start + rowsPerPage);
  }, [filteredRoles, page, rowsPerPage]);

  // Gestion de la recherche
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0); // Réinitialiser la pagination lors de la recherche
  };

  // Gestion des rôles
  const handleAdd = () => {
    setCurrentRole({ name: '' });
    setShowModal(true);
  };

  const handleEdit = (role) => {
    setCurrentRole(role);
    setShowModal(true);
  };

  const handleView = (role) => {
    setViewRole(role);
    setShowViewModal(true);
  };

  const handleShowDelete = (id) => {
    setCurrentRoleId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = (id) => {
    setRoles(prevRoles => prevRoles.filter(role => role._id !== id));
    dispatch(deleteRole(id));
    setShowDeleteModal(false);
  };

  const handleSave = (role) => {
    const { name } = role;
    if (role._id) {
      setRoles(prevRoles => prevRoles.map(r => (r._id === role._id ? role : r)));
      dispatch(editeRole(role._id, { name }));
    } else {
      setRoles(prevRoles => [...prevRoles, role]);
      dispatch(addRole({ name }));
    }
    setShowModal(false);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(roles);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Roles');
    XLSX.writeFile(wb, 'roles.xlsx');
  };

  // Calcul de la plage des entrées visibles
  const start = page * rowsPerPage + 1;
  const end = Math.min((page + 1) * rowsPerPage, filteredRoles?.length);

  return (
    loading ? (
      <div className='px-3 md:px-8 flex items-center flex-col justify-center h-screen'>
        <LoadingLoader />
        <p className='text-xl text-gray-500 text-center mt-3'>Patientez quelques minutes le temps que les données chargent</p>
      </div>
    ) : (
      <div className="w-full">
        <div className='mb-8 flex items-center justify-between flex-wrap gap-2'>
          <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Tous les Rôles</h2>
          <h4 className='text-base'>
            <span className='text-gray-500 cursor-pointer'>Tableau de bord / </span>
            <span className='text-purple-700'>Rôles</span>
          </h4>
        </div>
        <div className="flex justify-between mb-4 flex-wrap gap-3">
          <button className='px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-green-700' onClick={handleAdd}>Ajouter un rôle</button>
          <input 
            value={search} 
            className='px-3 py-2 text-gray-500 text-lg border border-gray-400 rounded-lg outline-none bg-transparent' 
            placeholder="Recherche..." 
            onChange={handleSearchChange} 
          />
          <button 
            className='px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-blue-700' 
            onClick={handleExport}
          >
            Exporter vers Excel
          </button>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} overflow-x-auto rounded-md shadow-2xl text-gray-500`}>
          <table className='w-1400px xl:w-full'>
            <thead>
              <tr>
                <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>ID</th>
                <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Nom</th>
                <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRoles?.map((role, index) => (
                <tr key={role._id}>
                  <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{start + index}</td>
                  <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{role.name}</td>
                  <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>
                    <button className="bg-transparent px-2 py-1 m-1" onClick={() => handleEdit(role)}>
                      <span className='text-gray-500'><FaPencil /></span>
                    </button>
                    <button className="bg-transparent px-2 py-1 m-1" onClick={() => handleShowDelete(role._id)}>
                      <span className='text-red-800'><RiDeleteBin6Line /></span>
                    </button>
                    <button className="bg-transparent px-2 py-1 m-1" onClick={() => handleView(role)}>
                      <span className='text-gray-500'><FaRegEye /></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 gap-2 flex-wrap">
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            className="border border-gray-300 p-2 rounded-md bg-gray-300 shadow-2xl"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <div>
            <span className="text-sm text-gray-700 font-semibold">
              Affichage de {start} à {end} sur {filteredRoles?.length} entrées
            </span>
          </div>
          <div className='flex items-center justify-between text-white'>
            <button 
              className="bg-blue-700 flex items-center justify-between rounded-md hover:bg-opacity-80 px-4 mr-3 py-2" 
              disabled={page === 0} 
              onClick={() => setPage(page - 1)}
            >
              <span><IoChevronBackSharp /></span>Précédent
            </button>
            <button 
              className="bg-blue-700 flex items-center justify-between rounded-md hover:bg-opacity-80 px-4 py-2" 
              disabled={(page + 1) * rowsPerPage >= filteredRoles?.length} 
              onClick={() => setPage(page + 1)}
            >
              Suivant <span><IoChevronForwardSharp /></span>
            </button>
          </div>
        </div>

        <AddEditUserModal
          show={showModal}
          role={currentRole}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />

        <DeleteRoleModal
          show={showDeleteModal}
          currentRoleId={currentRoleId}
          onDelete={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />

        <ViewRoleModal
          show={showViewModal}
          role={viewRole}
          onClose={() => setShowViewModal(false)}
        />
      </div>
    )
  );
};

export default Roles;
