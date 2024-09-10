import React, { useState } from "react";
import { useApprovePostMutation, useRejectPostApprovalMutation } from "../../../../services/groupsApi";
import { handleApiError } from "../../../handleApiError/handleApiError";
import { useDispatch } from "react-redux";

export default function ApproveBtn({ groupId, postId }) {
  const [approvePost, { isLoading: isApproving }] = useApprovePostMutation();
  const [rejectPost, { isLoading: isRejecting }] = useRejectPostApprovalMutation();
  const dispatch = useDispatch();

  const [status, setStatus] = useState(null);

  const handleApprove = async () => {
    try {
      await approvePost({ groupId, postId }).unwrap();
      setStatus('approved');
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  const handleReject = async () => {
    try {
      await rejectPost({ groupId, postId }).unwrap();
      setStatus('rejected');
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  if (status === 'approved') {
    return (
      <div className="alert alert-success py-1 px-2 d-inline-block small mb-0">
        Post Approved
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="alert alert-danger py-1 px-2 d-inline-block small mb-0">
        Post Rejected
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center me-3">
      <button
        className="btn btn-danger btn-sm me-1 "
        onClick={handleReject}
        disabled={isRejecting || isApproving}
      >
        {isRejecting ? "Removing..." : "Remove"}
      </button>
      <button
        className="btn btn-primary btn-sm ms-4"
        onClick={handleApprove}
        disabled={isApproving || isRejecting}
      >
        {isApproving ? "Approving..." : "Approve"}
      </button>
    </div>
  );
}
