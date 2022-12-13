createEvent();
loadData();
// Load dữ liệu:
/** 
 * Lấy dữ liệu
 * Author: TVHieu - MF1485 (5/12/2022)
 * EditBy: TVHieu - MF1485 (7/12/2022) - Sửa lại Api
*/
"use strict";
// Gọi Api lấy giữ liệu
function loadData() {
  $.ajax({
    type: "GET",
    url: "https://amis.manhnv.net/api/v1/Employees",
    success(respone) {
      console.log(respone);
      // xử lý dữ liệu
      // Hiển thị dữ liệu lên table:
      for (const emp of respone) {
        const employeeCode = emp.EmployeeCode;
        const employeeName = emp.EmployeeName;
        const employeePhone = emp.TelephoneNumber;
        const employeeDepartment = emp.DepartmentName;
        const trHTML = `<tr>
      <td class="number-marin">
          <input type="checkbox" class="checkbox-table">
      </td>
      <td class="number-marin">${employeeCode || ""}</td>
      <td class="number-left-name">${employeeName || ""}</td>
      <td class="number-marin">${employeePhone || ""}</td>
      <td class="number-left">${employeeDepartment || ""}</td>
      <td class="number-left">${employeeDepartment || ""}</td>
      <td class="number-left">${employeeDepartment || ""}</td>
      <td class="number-marin">
          <div class="table-checklist"></div>
      </td>
      <td class="number-marin">
          <div class="table-checklist"></div>
      </td>
      <td class="number-marin">
          <button class="btn-edit"></button>
          <button class="btn-remove"></button>
      </td>
  </tr>`;
        $("#tb-employee-list").append(trHTML);
      }
    },
    error(error) {
      console.log(error);
    },
  });
}

/** 
 * Ẩn hiện form thêm mới
 * Author: TVHieu - MF1485 (8/12/2022)
*/
window.onload = function () {
  initEvents();
}

function initEvents() {
  //Button add
  document.getElementById('btnAdd').addEventListener("click", btnAdd);
  //Button close
  document.getElementById('btnDialogClose').addEventListener("click", btnDialogClose);
}

function btnDialogClose() {
  //Ẩn form chi tiết
  document.getElementById("dialog-teacher-detail").style.display = "none";
}

function btnAdd() {
  try {
    //Hiện form chi tiết
    document.getElementById("dialog-teacher-detail").style.display = "block";
    // Lấy mã cán bộ mới/Set các giá trị mặc định (nếu có)
    $.ajax({
      type: "GET",
      url: "https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode",
      success: function (respone) {
        $("#txtEmployeeCode").val(respone);
        $("#txtEmployeeCode").focus();
      }
    });
  } catch (error) {

  }
}

/** 
 * Thực hiện lưu dữ liệu
 * Author: TVHieu - MF1485 (8/12/2022)
*/
function createEvent(){
  try {
    $("#btnSave").click(btnSaveOnclick);
  } catch (error) {
    console.log(error);
  }
}

function btnSaveOnclick() {
  try {
    // Thu thập dữ liệu
    const employee = $("#txtEmployeeName").val(); //--> bắt buộc
    const employeeCode = $("#txtEmployeeCode").val(); //--> bắt buộc
    const email = $("#txtEmail").val(); //--> đúng định dạng

    // Validate dữ liệu
    if ((employeeCode.toString().trim() == '') || employeeCode == null || employeeCode == undefined) {
      alert("Mã nhân viên không được để trống");
    }

    if ((employee.toString().trim() == '') || employee == null || employee == undefined) {
      alert("Tên nhân viên không được để trống");
    }

    if ((employeeCode.toString().trim() == '') || employeeCode == null || employeeCode == undefined) {
      alert("Mã nhân viên không được để trống");
    }
    // // Gọi api thực hiện cất dữ liệu
    // fetch("https://amis.manhnv.net/api/v1/Departments",
    //   { method: "POST", body: JSON.stringify(employee) })
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(res => {

    //   })
    // // Kiểm tra két quả trả về -> đưa ra thông báo:
  } catch (error) {

  }

}

/** 
 * Thực hiện validate dữ liệu
 * Author: TVHieu - MF1485 (8/12/2022)
*/
// function validateData() {
//   // Các thông tin bắt buộc phải nhập
//   var employeeCode = document.getElementById("txtEmployeeCode").value;
//   var fullname = document.getElementById("txtEmployeeName").value;
//   if (employeeCode == '' || employeeCode === '' || employeeCode == null) {
//     // Add border màu đỏ
//     document.getElementById("txtEmployeeCode").style.border = "1px solid #ff0400";
//     //Hiển thị thông báo ở bên dưới elêmnt

//   } else {
//     document.getElementById("txtEmployeeCode").style.border = "1px solid #000";
//   }
//   // Các thông tin đúng định dạng (email)

//   // Ngày tháng
// }
