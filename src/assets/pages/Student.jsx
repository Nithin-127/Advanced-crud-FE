import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchData, postmethood,deletemethood, editmethod } from "../../Services/Axios";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";


const Students = () => {
  const [getData, setgetData] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setshowEdit] = useState(false)
  const [postData, setpostData] = useState({
    name: "",
    age: "",
    course: "",
  });
   const [updatedata, setupdatedata] = useState({})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEdit = () => setshowEdit(false);
  

  const getFn = async () => {
    
      let response = await fetchData();
      setgetData(response.data);
    }
  

  //   postdata fn
  const postFN = async () => {
  
      if(postData.name.trim()=="" || postData.age.trim()=="" || postData.course.trim()==""){
        Swal.fire({
          title:"error",
          text:"data not added",
          icon:"error"
        })
      } else{
        let respo1 = await postmethood(postData)
        console.log(respo1.data);
        getFn();
        
      }

      
    }


  //  delete fn

  const deletefn = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletemethood(id);
          Swal.fire({
            title: "Deleted!",
            text: "Student has been deleted.",
            icon: "success",
          });
          getFn();
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete student.",
            icon: "error",
          });
        }
      }
    });
  };

  // edit fn
  const editfn = (data) => {
    setupdatedata(data);
    setshowEdit(true);
  };

  const updateFN = async () => {
    try {
      await editmethod(updatedata.id, updatedata);
      Swal.fire({
        title: "Success!",
        text: "Student data updated successfully!",
        icon: "success",
      });
      getFn();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update student data.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getFn();
  }, []);

  return (
    <div>
      <div className="container">
        <h2 className="d-flex justify-content-center bg-danger mt-3 text-white">
          Students Management System
        </h2>

        <div className="d-flex justify-content-center">
          <Button className="mt-4" onClick={handleShow}>
            ADD MORE
          </Button>
        </div>

        <div className="mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Age</th>
                <th>Course</th>
                <th>Operations</th>
              </tr>
            </thead>

            <tbody>
              {getData.map((eachdata) => (
                <tr key={eachdata.id}>
                  <td>{eachdata.id}</td>
                  <td>{eachdata.name}</td>
                  <td>{eachdata.age}</td>
                  <td>{eachdata.course}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-3">
                      <button onClick={()=>{
                        deletefn(eachdata.id)
                      }} className="btn btn-danger">DELETE</button>
                      <button  onClick={()=>{
                        editfn(eachdata)
                        
                      }} className="btn btn-warning">EDIT</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Enter name"
              className="form-control mb-2"
            
              onChange={(e) => setpostData({ ...postData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enter age"
              className="form-control mb-2"
             
              onChange={(e) => setpostData({ ...postData, age: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enter course"
              className="form-control mb-2"
              
              onChange={(e) => setpostData({ ...postData, course: e.target.value })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={()=>{
                handleClose()
                postFN()

            }} variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal>


        {/* edit modal */}

          <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Enter name"
              className="form-control mb-2"
              value={updatedata.name}
              onChange={(e) => setupdatedata({ ...updatedata, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enter age"
              value={updatedata.age}
              className="form-control mb-2"
              onChange={(e) => setupdatedata({ ...updatedata, age: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enter course"
              value={updatedata.course}
              className="form-control mb-2"
              onChange={(e) => setupdatedata({ ...updatedata, course: e.target.value })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button onClick={()=>{
                handleCloseEdit()
                updateFN()

            }} variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal>



      </div>
    </div>
  );
};

export default Students;
