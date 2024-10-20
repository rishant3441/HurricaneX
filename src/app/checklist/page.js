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

  const handleSignInClick = () => {
    const currentUrl = encodeURIComponent(window.location.pathname);
    router.push(`/sign-in?redirect=${currentUrl}`);
  };

  const pageStyle = {
    background: user
      ? '#f5f5f5'
      : 'linear-gradient(135deg, #87CEEB, #1E90FF)',
    color: user ? '#333' : '#fff',
    padding: '20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const checklistStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginTop: '20px',
    width: '100%',
    maxWidth: '600px',
  };

  const itemStyle = (acquired) => ({
    backgroundColor: acquired ? '#DFF2BF' : '#FFBABA',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  });

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '16px',
    margin: '10px 0',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
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

  return (
    <div style={pageStyle}>
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-8 text-black-600 leading-tight">
  {user ? 'Your Hurricane Preparation Checklist' : 'Plan Your Hurricane Survival Checklist'}
</h1>

      {user ? (
        <>
          <div style={checklistStyle}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {checklist.map((item, index) => (
                <li key={index} style={itemStyle(item.acquired)}>
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
                      style={deleteButtonStyle}
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {isAddingItem && (
            <div style={{ marginTop: '20px' }}>
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Enter new item"
                style={{ padding: '10px', marginRight: '10px', width: '300px' }}
              />
              <button onClick={handleConfirmAdd} style={buttonStyle}>
                Confirm
              </button>
              <button onClick={handleCancelAdd} style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>
                Cancel
              </button>
            </div>
          )}

          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
            <button onClick={handleAddItem} style={buttonStyle}>
              Add New Item
            </button>
            <button onClick={handleDeleteItem} style={isDeletingItem ? { ...buttonStyle, backgroundColor: '#28a745' } : deleteButtonStyle}>
              {isDeletingItem ? 'Done Deleting' : 'Delete Items'}
            </button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '20px', lineHeight: '1.5' }}>
            Track essential supplies, stay prepared, and make sure you have everything you need to weather the storm. Our checklist is completely free and syncs across all your devices!
          </p>
          <p style={{ fontSize: '18px', lineHeight: '1.4', marginTop: '10px' }}>
            Sign in to start creating and saving your personalized hurricane preparation checklist. 
            It's easy to add and track your items anytime, anywhere.
          </p>
          <button onClick={handleSignInClick} style={{ ...buttonStyle, backgroundColor: '#28a745', fontSize: '18px' }}>
            Sign In & Get Started
          </button>
        </div>
      )}
    </div>
  );
}

export default Page;
