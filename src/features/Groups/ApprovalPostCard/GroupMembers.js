import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./GroupMembers.css";
import { useAddGroupAdminMutation, useKickOutMemberMutation } from "../../../services/groupsApi";
import { handleApiError } from "../../handleApiError/handleApiError";
import { useDispatch } from "react-redux";

export default function GroupMembers({ name, isCreator, image, identifier, isAdmin, isAuth, groupId, newMemberId, isAuthIsCreator }) {
  const dispatch = useDispatch();
  
  const isSmallScreen = useMediaQuery({ query: '(max-width: 400px)' });
  const [isAdminLocal, setIsAdminLocal] = useState(isAdmin);
  const [isDropdownVisible, setIsDropdownVisible] = useState(true); // State to manage dropdown visibility
  const [addAdmin, { isLoading: isAddAdminLoading }] = useAddGroupAdminMutation();
  const [kickOutMember, { isLoading: isKickOutLoading }] = useKickOutMemberMutation();

  const isLoading = isAddAdminLoading || isKickOutLoading; // Common loading state

  const handleAddAdmin = async () => {
    try {
      await addAdmin({ groupId, newMember: newMemberId }).unwrap();
      setIsAdminLocal(true); // Update the local admin status
    } catch (err) {
      handleApiError(err, dispatch);
    }
  };

  const handleKickOut = async () => {
    try {
      await kickOutMember({ groupId, memberId: newMemberId }).unwrap();
      // Hide the dropdown menu after successful kick out
      setIsDropdownVisible(false);
    } catch (err) {
      handleApiError(err, dispatch);
    }
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className={`friend-request-container d-flex align-items-center mt-2 py-2 shadow-sm rounded`} style={{ maxWidth: '100%' }}>
      <div className="profile-image me-2">
        <img className="rounded-circle" src={image} alt="user" height="55px" width="55px" />
      </div>
      <div className="profile-info flex-grow-1">
        <p className="fw-bold mb-0 text-truncate d-flex align-items-center">
          {isSmallScreen ? truncateText(name, 12) : name}
          {isAdminLocal && (
            <span className="badge bg-primary ms-2" style={{ fontSize: '0.75rem' }}>
              Admin
            </span>
          )}
        </p>
        <p className="text-muted mb-0 text-truncate">
          {isSmallScreen ? truncateText(identifier, 12) : identifier}
        </p>
      </div>
      {/* Show dropdown only if the user is not the creator, not the authenticated user, and either:
           1. The user is not an admin, or
           2. The user is an admin, but the authenticated user is the creator (isAuthIsCreator is true) */}
      {(!isCreator && !isAuth && isDropdownVisible && (!isAdminLocal || isAuthIsCreator)) && (
        <div className="dropdown ms-auto">
          <button className="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fas fa-ellipsis-v"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
            {!isAdminLocal && (
              <li>
                <a
                  className={`dropdown-item ${isLoading ? 'disabled' : ''}`} // Disable both buttons when loading
                  style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }} // Update cursor to indicate loading state
                  onClick={isLoading ? null : handleAddAdmin} // Prevent click when loading
                >
                  {isLoading ? 'Adding...' : 'Add as admin'} 
                </a>
              </li>
            )}
            <li>
              <a
                className={`dropdown-item ${isLoading ? 'disabled' : ''}`} // Disable both buttons when loading
                style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }} // Update cursor to indicate loading state
                onClick={isLoading ? null : handleKickOut} // Prevent click when loading
              >
                {isLoading ? 'Kicking out...' : 'Kick from group'}
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
