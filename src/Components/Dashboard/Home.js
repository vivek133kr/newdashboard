import { Button } from "@mui/material";
import ReactTable from "react-table";
import Edit from "./edit.png"
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useEffect } from "react";
import { DataContext } from "../../Contexts/dataContext";
const data = [
  {
    id: 1321,
    applicantName: "Vivek Kumar",
    date: "11/07/2023",
    noOfAttempt: 1,
    fillStatus: "Completed",
  },
  {
    id: 1324,
    applicantName: "Vivek Kumar",
    date: "11/07/2023",
    noOfAttempt: 1,
    fillStatus: "Completed",
  },
];

const columns = [
  {
    Header: "Name",
    accessor: "name", // String-based value accessors!
    style: { whiteSpace: "nowrap" },
  },
  {
    Header: "Age",
    accessor: "age",
    style: { whiteSpace: "nowrap" },
  },
  {
    Header: "Friend Name",
    accessor: "friend.name", // Custom value accessors!
    style: { whiteSpace: "nowrap" },
  },
  {
    Header: () => <span>Friend Age</span>, // Custom header components!
    accessor: "friend.age",
    style: { whiteSpace: "nowrap" },
  },
];

function App() {

  const {counsellorData} = useContext(DataContext)
  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async () =>{
      await fetch("https://upsc.joshtalks.org/api/v1/forms/document_forms/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: counsellorData.token,
        },
       
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
  
  }
  console.log(JSON.parse(localStorage.getItem("CounsellorData")));
  return (
    <div style={{ width: "100%"}}>
      <table
        className="my-table"
        style={{ width: "100%", marginTop:"50px", backgroundColor: "#F6F6F6" }}
      >
        <thead style={{ width: "100%" }}>
          <tr style={{ width: "100%" }}>
            <th>Form ID</th>
            <th>Applicant Name</th>
            <th>Date</th>
            <th>No. of Attempt</th>
            <th>Fill Status</th>
            <th>Approval</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody
          style={{
            backgroundColor: "#EDF0F7",
          }}
        >
          {data.map((row, index) => (
            <tr key={row.id} style={{ padding: "50px", marginBottom: "50px" }}>
              <td
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  color: "blue",
                }}
              >
                {row.id}
              </td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    backgroundColor: "white",
                    textAlign: "left",
                    paddingLeft: "20px",
                  }}
                >
                  {" "}
                  {row.applicantName.split(" ")[0]}
                </p>
              </td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                {row.date}
              </td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                {row.noOfAttempt}
              </td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    backgroundColor: "#D3D7DE",
                    borderRadius: "60px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "green",
                      width: "15px",
                      height: "15px",
                      marginRight: "10px",
                      borderRadius: "180px",
                    }}
                  ></div>
                  <p> {row.fillStatus}</p>
                </div>
              </td>

              <td
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",

                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    width: "100px",
                    backgroundColor: "#00875A",
                  }}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  style={{
                    width: "100px",
                    marginBottom: "10px",
                    backgroundColor: "#DE350B",
                  }}
                >
                  Reject
                </Button>
              </td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={Edit}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                    alt="edit"
                  />
                  <DeleteIcon style={{ cursor: "pointer" }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
