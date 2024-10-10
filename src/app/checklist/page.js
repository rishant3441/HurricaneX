'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { BeatLoader } from 'react-spinners';
import 'mapbox-gl/dist/mapbox-gl.css';
import addData from '@/firebase/addData';
import getDocument from '@/firebase/getData';

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checklist, setChecklist] = useState([
    { item: 'Water (one gallon per person per day for at least three days)', acquired: false },
    { item: 'Food (at least a three-day supply of non-perishable food)', acquired: false },
    { item: 'Radio or a phone with roaming/satellite internet', acquired: false },
    { item: 'Flashlight and extra batteries', acquired: false },
    { item: 'First aid kit', acquired: false },
    { item: 'Local maps', acquired: false },
  ]);
  const [loading, setLoading] = useState(true);
  const [newItemText, setNewItemText] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isDeletingItem, setIsDeletingItem] = useState(false);

  useEffect(() => {
    if (user && searchParams.get('redirect')) {
      router.push(searchParams.get('redirect'));
    }

    if (user) {
      const fetchChecklist = async () => {
        const { result, error } = await getDocument(user.uid, 'checklists');

        if (error) {
          console.error('Error fetching checklist:', error);
        } else if (result.exists()) {
          setChecklist(result.data().items || []);
        } else {
          await addData(user.uid, 'checklists', { items: checklist });
          console.log('New checklist created for user:', user.uid);
        }
        setLoading(false);
      };

      fetchChecklist();
    } else {
      setLoading(false);
    }
  }, [user]);

  const saveChecklistToFirebase = async (newChecklist) => {
    if (user) {
      const { error } = await addData(user.uid, 'checklists', { items: newChecklist });
      if (error) {
        console.error('Error saving checklist:', error);
      } else {
        console.log('Checklist updated successfully for user:', user.uid);
      }
    }
  };

  const handleCheckboxChange = async (index) => {
    const newChecklist = [...checklist];
    newChecklist[index].acquired = !newChecklist[index].acquired;
    setChecklist(newChecklist);
    await saveChecklistToFirebase(newChecklist);
  };

  const handleAddItem = () => {
    setIsAddingItem(true);
  };

  const handleConfirmAdd = async () => {
    if (newItemText.trim()) {
      const newChecklist = [...checklist, { item: newItemText.trim(), acquired: false }];
      setChecklist(newChecklist);
      setNewItemText('');
      setIsAddingItem(false);
      await saveChecklistToFirebase(newChecklist);
    }
  };

  const handleCancelAdd = () => {
    setNewItemText('');
    setIsAddingItem(false);
  };

  const handleDeleteItem = () => {
    setIsDeletingItem(!isDeletingItem);
  };

  const handleConfirmDelete = async (index) => {
    const newChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(newChecklist);
    await saveChecklistToFirebase(newChecklist);
  };

  if (loading || user === undefined) {
    return (
      <BeatLoader
        cssOverride={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  const handleSignInClick = () => {
    const currentUrl = encodeURIComponent(window.location.pathname);
    router.push(`/sign-in?redirect=${currentUrl}`);
  };

  const buttonStyle = {
    padding: '10px 15px',
    margin: '0 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
      <div
        style={{
          width: '100vw',
          height: '100%',
          padding: '20px',
          overflowY: 'auto',
          backgroundColor: '#f5f5f5',
        }}
      >
        <h1>Hurricane Preparation Checklist</h1>
        {user ? (
          <>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {checklist.map((item, index) => (
                <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        checked={item.acquired}
                        onChange={() => handleCheckboxChange(index)}
                        style={{ marginRight: '10px' }}
                      />
                      {item.item}
                    </label>
                  </div>
                  {isDeletingItem && (
                    <button
                      onClick={() => handleConfirmDelete(index)}
                      style={{ ...deleteButtonStyle, marginLeft: '20px' }}
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {isAddingItem && (
              <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  placeholder="Enter new item"
                  style={{ padding: '10px', marginRight: '10px', width: '300px' }}
                />
                <button onClick={handleConfirmAdd} style={buttonStyle}>Confirm</button>
                <button onClick={handleCancelAdd} style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>Cancel</button>
              </div>
            )}
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
              <button onClick={handleAddItem} style={buttonStyle}>Add New Item</button>
              <button onClick={handleDeleteItem} style={isDeletingItem ? { ...buttonStyle, backgroundColor: '#28a745' } : deleteButtonStyle}>
                {isDeletingItem ? 'Done Deleting' : 'Delete Items'}
              </button>
            </div>
          </>
        ) : (
          <div>
            <p>Please log in to create and save your own checklist.</p>
            <button
              onClick={handleSignInClick}
              style={buttonStyle}
            >
              Go to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;