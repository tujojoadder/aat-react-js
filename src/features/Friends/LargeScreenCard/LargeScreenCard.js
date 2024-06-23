import React from 'react'

export default function LargeScreenCard(props) {
  return (
    <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
      <div className="card shadow-sm border-0 rounded">
        <div className="card-body p-0 pb-3" style={{ overflow: "hidden", height: "auto" }}>
          <img src={props.image} alt="" className="w-100 card-img-top" />
          <div className="pt-3 px-2">
            <h6 className="mb-0 text-truncate">{props.name}</h6>
            <p className="small text-muted text-truncate">{props.handle}</p>
            <div className="d-flex flex-column">
              <button className="btn btn-md btn-primary mb-2 w-100">Confirm</button>
              <button className="btn btn-md w-100" style={{ backgroundColor: "#ebedf0" }}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
