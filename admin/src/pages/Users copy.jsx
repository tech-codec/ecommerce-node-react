import React, { useState, useMemo, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Button, TextField } from '@mui/material';
import Modal from 'react-modal';
import * as XLSX from 'xlsx';
import { usersData } from '../assets/data';
import ModalForm from '../components/Modals/ModalForm'; // Importer le formulaire modale
import UserViewModal from '../components/Modals/UserViewModal'; // Importer la modale de visualisation
import { useTheme } from '../context/ThemeContext';
import { FaPencil } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";

Modal.setAppElement('#root');

const Users = () => {
    const { theme } = useTheme()
  const [users, setUsers] = useState( usersData); // Données des utilisateurs
  const [showModal, setShowModal] = useState(false); // Afficher/Masquer la modale de formulaire
  const [showViewModal, setShowViewModal] = useState(false); // Afficher/Masquer la modale de visualisation
  const [currentUser, setCurrentUser] = useState(null); // Utilisateur courant pour modification
  const [viewUser, setViewUser] = useState(null); // Utilisateur courant pour visualisation
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Gestion des données filtrées et paginées
  const filteredUsers = useMemo(() => {
    return users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()));
  }, [users, search]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Fonctions de gestion des utilisateurs
  const handleAdd = () => {
    setCurrentUser(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleView = (user) => {
    setViewUser(user);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  const handleSave = (user) => {
    if (user.id) {
      setUsers(prevUsers => prevUsers.map(u => (u.id === user.id ? user : u)));
    } else {
      setUsers(prevUsers => [...prevUsers, { ...user, id: prevUsers.length + 1 }]);
    }
    setShowModal(false);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'users.xlsx');
  };

  

  return (
    <div className="container w-full">


    
    <div className=' mb-8 flex items-center justify-between flex-wrap gap-2'>
        <h2 className={`text-2xl font-semibold ${theme ==='dark' ? 'text-white' : 'text-gray-800'} `}>Tous les utilisateurs</h2>
        <h4 className='text-base'><span className='text-gray-500 cursor-pointer'>Tableau de bord / </span><span className='text-purple-700'>Utilisateur</span></h4>
    </div>
      <div className="flex justify-between mb-4 flex-wrap gap-3">
        <button className='px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-green-700' onClick={handleAdd}>Ajouter un utilisateur</button>
        <input value={search} className='px-3 py-2 text-gray-500 text-lg border border-gray-400 rounded-lg outline-none bg-transparent' placeholder="Recherche..." onChange={(e) => setSearch(e.target.value)}/>
        <button className='px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-blue-700' onClick={handleExport}>Exporter vers Excel</button>
      </div>

      <Paper sx={{color:'#6b7280', backgroundColor: theme === 'dark' ? '#374151' : 'white'}}>
        <TableContainer component={Paper}>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell><TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => handleEdit(user)}><span className='text-gray-500'><FaPencil/></span></Button>
                    <Button color="secondary" onClick={() => handleDelete(user.id)}><span className='text-red-800'><RiDeleteBin6Line/></span></Button>
                    <Button color="info" onClick={() => handleView(user)}><span className='text-gray-500'><FaRegEye/></span></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <ModalForm currentUser={currentUser} onSave={handleSave} onClose={() => setShowModal(false)} />
      </Modal>

      <Modal isOpen={showViewModal} onRequestClose={() => setShowViewModal(false)}>
        <UserViewModal user={viewUser} onClose={() => setShowViewModal(false)} />
      </Modal>
    </div>
  );
};

export default Users;



import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import AddEditUserModal from './AddEditUserModal';
import ViewUserModal from './ViewUserModal';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  // Ajoutez d'autres utilisateurs initiaux si nécessaire
];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Gestion des données filtrées
  const filteredUsers = useMemo(() => {
    const lowercasedSearch = search.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(lowercasedSearch) ||
      user.email.toLowerCase().includes(lowercasedSearch)
    );
  }, [users, search]);

  const paginatedUsers = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, page, rowsPerPage]);

  // Fonctions de gestion des utilisateurs
  const handleAdd = () => {
    setCurrentUser({ id: null, name: '', email: '' });
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleView = (user) => {
    setViewUser(user);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  const handleSave = (user) => {
    if (user.id) {
      setUsers(prevUsers => prevUsers.map(u => (u.id === user.id ? user : u)));
    } else {
      setUsers(prevUsers => [...prevUsers, { ...user, id: prevUsers.length + 1 }]);
    }
    setShowModal(false);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'users.xlsx');
  };

  // Gestion de la recherche et de la pagination
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0); // Réinitialiser la pagination lors de la recherche
  };

  // Calcul de la plage des entrées visibles
  const start = page * rowsPerPage + 1;
  const end = Math.min((page + 1) * rowsPerPage, filteredUsers.length);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleAdd}>Ajouter un utilisateur</button>
        <input
          type="text"
          placeholder="Recherche..."
          value={search}
          onChange={handleSearchChange}
          className="border p-2 w-1/3"
        />
        <button className="bg-green-500 text-white px-4 py-2" onClick={handleExport}>Exporter vers Excel</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 text-white px-2 py-1 m-1" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 m-1" onClick={() => handleDelete(user.id)}>Delete</button>
                  <button className="bg-gray-500 text-white px-2 py-1 m-1" onClick={() => handleView(user)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button className="bg-gray-300 px-4 py-2" disabled={page === 0} onClick={() => setPage(page - 1)}>Précédent</button>
        <span className="text-sm text-gray-700">
          Affichage de {start} à {end} sur {filteredUsers.length} entrées
        </span>
        <button className="bg-gray-300 px-4 py-2" disabled={(page + 1) * rowsPerPage >= filteredUsers.length} onClick={() => setPage(page + 1)}>Suivant</button>
        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0); // Réinitialiser la pagination lors du changement du nombre de lignes par page
          }}
          className="border p-2"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <AddEditUserModal
        show={showModal}
        user={currentUser}
        onSave={handleSave}
        onClose={() => setShowModal(false)}
      />

      <ViewUserModal
        show={showViewModal}
        user={viewUser}
        onClose={() => setShowViewModal(false)}
      />
    </div>
  );
};

export default Users;

