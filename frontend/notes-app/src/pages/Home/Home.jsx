import React, { useEffect, useState } from 'react'
import Navbar from '../../components/nav/Navbar'
import NoteCard from '../../components/cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/empty-card/EmptyCard'
import addNotesImage from '../../assets/images/notes.png'
import noDataImage from '../../assets/images/note.png'

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails })
  }

  // Show Toast Msg
  const showToastMessage = (message, type) => {
    console.log("Showing toast message:", message, type);
    setShowToastMsg({
        isShown: true,
        message,
        type,
    });
};

  // Hide Toast Msg
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    })
  }

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  // Get All Notes
  const getAllNotes = async () => {
    try{
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An expected error occured. Please try again");
    }
  }

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try{
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error){
        showToastMessage("Note Deleted Successfully", 'delete');
        getAllNotes();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message){
        console.log("An expected error occured. Please try again");
      }
    }
  }

  // Search for a note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      })

      if (response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Pin Note
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try{
      const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
        isPinned: !noteData.isPinned,
      });

      if (response.data && response.data.note){
          showToastMessage("Note Updated Successfully")
          getAllNotes()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <div className='pb-32 sm:pb-5'>
      <header className='sticky top-0 border-b-2 border-b-gray-50'>
        <Navbar userInfo={ userInfo } onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
      </header>

      <main className='animate-in'>
        <div className='animate-incontainer w-[80%] mx-auto'>
          {allNotes.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
                className='rounded-2xl'
              />
            ))}
          </div> 
          ) : (
            <EmptyCard imgSrc={ isSearch ? noDataImage : addNotesImage} message={isSearch ? `Oops! No notes found matching your search` :`Start creating your first note! Click on the add button to jot down
            your thoughts, ideas, and reminders. Let's get Started!`}/>
          )}
        </div>

        

        <Modal
          ariaHideApp={false}
          isOpen ={openAddEditModal.isShown}
          onRequestClose = {() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel=''
          className='w-[70%] lg:w-[50%] max-h-full bg-white rounded-md mx-auto mt-14 p-5'
        >
          <AddEditNotes
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={() => {
              setOpenAddEditModal({ isShown: false, type: "add", data: null })
            }}
            getAllNotes={getAllNotes}
            showToastMessage={showToastMessage}
          />
        </Modal>
        
        <Toast
          isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
        />
      </main>
      <button 
          className='w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 right-5 bottom-10 fixed' 
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type:"add", data: null})
        }}
        >
          <MdAdd className='text-[32px] text-white'/>
      </button>
    </div>
  )
}

export default Home;