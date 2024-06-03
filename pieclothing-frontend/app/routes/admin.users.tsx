import { useEffect, useState } from "react";
import AdminHeader from "~/component/adminHeader";
import AdminSidebar from "~/component/adminSidebar";
import isadmin from "~/component/isadmin";
import styles from "../styles/admin.css";
import { allUserData, deleteUserById } from "~/controllers/userController";

const adminUsers = () => {
  isadmin();

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    allUser();
  }, []);

  const allUser = async () => {
    const response: any = await allUserData();
    if (response?.success) {
      console.log(response);
      setUserList(response?.userData);
    }
  };

  const deleteUser = async (id: any) => {
    const response: any = await deleteUserById(id);
    if (response.success) {
      console.log(response);

      setUserList((user: any) => {
        let userData = user.filter((u: any) => u._id != id);
        return userData;
      });

      alert("deleted");
    } else {
      alert("Error");
    }
  };

  return (
    <>
      <div className="dash-container">
        <AdminSidebar />
        <div className="dash-main">
          <AdminHeader />
          <div className="dash-body">
            <div className="dash-content">
              <table className="pro-table" border={1}>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Created At</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.length > 0
                    ? userList.map((user: any, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{user?.firstName + " " + user?.lastName}</td>
                            <td>{user?.email}</td>
                            <td>{user?.phone}</td>
                            <td>
                              {" "}
                              {new Date(user?.created_at).toLocaleString()}
                            </td>
                            <td>
                              <button
                                className="delete"
                                onClick={() => {
                                  let sure = confirm(
                                    "Are you sure you want to delete?"
                                  );
                                  sure && deleteUser(user?._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default adminUsers;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
