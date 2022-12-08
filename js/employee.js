loadData();
createEvent();
// Load dữ liệu:
/** 
 * Lấy dữ liệu
 * Author: TVHieu - MF1485 (5/12/2022)
 * EditBy: TVHieu - MF1485 (7/12/2022) - Sửa lại Api
*/
"use strict";
// GOI API LAY DU LIEU
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

  // Hanlde lỗi từ Api (nếu có)

}

//Lập trình cho các sự kiện:
function createEvent() {

}
//1 Bấm vào nut thêm hiển thị dialog nhập thông tin chi tiết.
//2 Chuyển trang paging:
//..........
