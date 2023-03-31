import { useState } from "react";

const initialValues = {
  userName: "",
  userSurname: "",
  userSalary: "",
};

const App = () => {
  const [userData, setUserData] = useState(initialValues);

  const [users, setUsers] = useState([]);

  const [editabeleUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null,
  });

  const removeUser = (index) => {
    setUsers(users.filter((user, userIndex) => userIndex !== index));
  };

  const isFilled =
    userData.userName && userData.userSalary && userData.userSurname;

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (isFilled) {
      if (editabeleUserData.isEdit) {
        const editableData = users;
        editableData.slice(editabeleUserData.userIndex, 1, userData);

        setUsers(editableData);

        setEditableUserData({
          idEdit: false,
          userIndex: null,
        });
      } else {
        setUsers((prevState) => [...prevState, userData]);
      }

      setUserData(initialValues);
    }
  };

  const cancelHandler = () => setUserData(initialValues);

  const editHandler = (data, index) => {
    setUserData(data);
    setEditableUserData({
      idEdit: true,
      userIndex: index,
    });
  };

  return (
    <div className="p-5 flex items-center justify-between flex-col space-y-5">
      <table className="border-2 border-black">
        <th className="bg-gray-800 text-white px-4 py-2">ID</th>
        <th className="bg-gray-800 text-white px-4 py-2">User Name</th>
        <th className="bg-gray-800 text-white px-4 py-2">User Surname</th>
        <th className="bg-gray-800 text-white px-4 py-2">User Salary</th>
        <th className="bg-gray-800 text-white px-4 py-2">Actions</th>

        <tbody className="text-center">
          {users.map((user, index) => (
            <tr className="border-2 border-black">
              <td className="border-2 border-black p-3">{index + 1}</td>
              <td className="border-2 border-black p-3">{user.userName}</td>
              <td className="border-2 border-black p-3">{user.userSurname}</td>
              <td className="border-2 border-black p-3">{user.userSalary}</td>
              <td className="p-3">
                <div className="flex gap-5">

                  <button
                    onClick={() => editHandler(user, index)}
                    className="bg-blue-500 flex px-6 py-2 text-white hover:bg-blue-500/80 rounded-md "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => removeUser(index)}
                    className="bg-red-500 flex px-6 py-2 text-white hover:bg-red-500/80 rounded-md "
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form
        className="space-y-2"
        onSubmit={submitFormHandler}
        onReset={cancelHandler}
      >
        <div className="flex items-center flex-col gap-5">
          <input
            placeholder="Enter your name"
            className="outline-none border-2 border-black py-2 rounded-md pl-2"
            onChange={(e) =>
              setUserData((prevState) => ({
                ...prevState,
                userName: e.target.value,
              }))
            }
            value={userData.userName}
          />
          <input
            placeholder="Enter your surname"
            className="outline-none border-2 border-black py-2 rounded-md pl-2"
            onChange={(e) =>
              setUserData((prevState) => ({
                ...prevState,
                userSurname: e.target.value,
              }))
            }
            value={userData.userSurname}
          />
          <input
            placeholder="Enter your salary"
            className="outline-none border-2 border-black py-2 rounded-md pl-2"
            onChange={(e) =>
              setUserData((prevState) => ({
                ...prevState,
                userSalary: e.target.value,
              }))
            }
            value={userData.userSalary}
          />
        </div>

        <div className="flex items-center gap-5">
          <button
            type="reset"
            className="flex px-8 py-2 bg-black text-white hover:bg-black/80 rounded-md"
          >
            Clean
          </button>
          <button
            disabled={!isFilled}
            type="submit"
            className="flex px-8 py-2 bg-black text-white hover:bg-black/80 rounded-md"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
