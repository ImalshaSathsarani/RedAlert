import React from 'react';
import AdminSideBar from './AdminSideBar';

const RegisteredUsers = () => {
  return (
    <div style={{ display: 'flex', fontFamily: 'sans-serif' }}>
      
      <AdminSideBar />
      
      <div style={{ paddingLeft: 100, paddingTop: 80, width: '100%' }}>
        
        <div style={{ fontSize: 24, fontWeight: 'bold',marginTop:10 }}>
          Registered Users
        </div>

        <div>
          <table style={{
            width: '80%',
            borderCollapse: 'collapse',
            fontFamily: 'sans-serif',
            marginTop: 40
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f9f9f9', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}></th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Name</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Admin</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Members</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Status</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Run time</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Finish date</th>
              </tr>
            </thead>
            
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}><input type="checkbox" /></td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}><input type="checkbox" /></td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}><input type="checkbox" /></td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}><input type="checkbox" /></td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}><input type="checkbox" /></td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>6 Mon</td>
                </tr>
                
              </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default RegisteredUsers
