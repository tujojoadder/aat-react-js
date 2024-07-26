import React from 'react'

export default function SearchBox() {
  return (
    <div className="bg-opacity-10 bg-black rounded-pill pt-0 mb-3 mt-2  mx-3">
              <div className="row d-flex align-items-center">
                
                <div className="col-10">
                  <input
                    type="text"
                    className="ms-2 form-control-lg border-0 me-1 w-100 bg-transparent"
                    placeholder="Search Twitter"
                  />
                </div>
              </div>
            </div>
  )
}
