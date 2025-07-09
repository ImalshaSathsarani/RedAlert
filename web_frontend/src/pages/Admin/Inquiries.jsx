import React, { useState } from 'react'
import AdminSideBar from './AdminSideBar'

const dummyInquiries = [
  {
    id: 1,
    name: 'Jane Doe',
    email: 'jane@example.com',
    subject: 'Blood donation eligibility',
    message: 'Can I donate blood if I had COVID last month?',
    date: '2025-07-08',
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john@example.com',
    subject: 'RedAlert account issue',
    message: 'I can’t log into my donor profile. Please help.',
    date: '2025-07-07',
  },
]

const Inquiries = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [replyMessage, setReplyMessage] = useState('')

  const handleReplyClick = (inquiry) => {
    setSelectedInquiry(inquiry)
    setShowModal(true)
    setReplyMessage('')
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedInquiry(null)
    setReplyMessage('')
  }

  const handleSendReply = () => {
    console.log(`Replying to ${selectedInquiry.email} with message:`, replyMessage)
    // TODO: Send reply to backend
    handleCloseModal()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', gap: '40px' }}>
      <AdminSideBar />
      <div style={{ padding: '40px', flexGrow: 1 }}>
        <h1 style={{ fontFamily: 'Poppins', marginBottom: '30px' }}>Inquiries</h1>

        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'Poppins',
          fontSize: '15px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#FFCCCC' }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Subject</th>
              <th style={thStyle}>Message</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyInquiries.map((inq) => (
              <tr key={inq.id} style={{ backgroundColor: '#FFF8F8' }}>
                <td style={tdStyle}>{inq.name}</td>
                <td style={tdStyle}>{inq.email}</td>
                <td style={tdStyle}>{inq.subject}</td>
                <td style={tdStyle}>{inq.message}</td>
                <td style={tdStyle}>{inq.date}</td>
                <td style={tdStyle}>
                  <button style={buttonStyle}>Mark as Read</button>
                  <button style={replyButtonStyle} onClick={() => handleReplyClick(inq)}>Reply</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && (
          <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
              <h2 style={{ fontFamily: 'Poppins' }}>Reply to {selectedInquiry?.name}</h2>
              <p><strong>Subject:</strong> {selectedInquiry?.subject}</p>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply here..."
                style={textareaStyle}
              />
              <div style={{ marginTop: '10px' }}>
                <button onClick={handleSendReply} style={sendButtonStyle}>Send Reply</button>
                <button onClick={handleCloseModal} style={closeButtonStyle}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Styles
const thStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  textAlign: 'left',
  backgroundColor: '#f8f8f8',
  fontFamily: 'Poppins',
}

const tdStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  verticalAlign: 'top'
}

const buttonStyle = {
  padding: '5px 10px',
  backgroundColor: '#FF6B6B',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  marginRight: '5px',
  cursor: 'pointer'
}

const replyButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#6B9EFF',
  marginTop: '5px'
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100%', height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
}

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '10px',
  width: '500px',
  maxWidth: '90%',
  fontFamily: 'Poppins'
}

const textareaStyle = {
  width: '100%',
  height: '100px',
  marginTop: '10px',
  padding: '10px',
  fontSize: '14px',
  fontFamily: 'Poppins'
}

const sendButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#28a745'
}

const closeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#6c757d'
}

export default Inquiries
