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
  //Close toast_msg error
  document.getElementById('toastMsgClose').addEventListener("click", bntCloseErrorMessage);
  //Close toast_msg succes
  document.getElementById('toastMsgSuccesClose').addEventListener("click", bntCloseSuccesMessage);
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

    //forcus vào ô nhập liệu đầu tiên
    $("#txtEmployeeCode").focus();
  } catch (error) {
    console.log("error");
  }
}

/** 
 * Thực hiện lưu dữ liệu
  * Author: TVHieu - MF1485 (15/12/2022)
*/
function createEvent() {
  try {
    $("#btnSave").click(btnSaveOnclick);
    $("#txtEmployeeCode").blur(onValidateFieldRequired1);
    $("#txtEmployeeName").blur(onValidateFieldRequired2);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Đóng thông báo lỗi khi nhập sai thông tin cán bộ
 * Author: TVHieu - MF1485 (8/12/2022)
*/
function bntCloseErrorMessage() {
  //Ẩn toast msg
  document.getElementById("toastMsg").style.display = "none";
}

/**
 * Đóng thông báo khi thông tin cán bộ lưu thông tin cán bộ thành công
 * Author: TVHieu - MF1485 (8/12/2022)
*/
function bntCloseSuccesMessage() {
  //Ẩn toast msg
  document.getElementById("toastMsgSucces").style.display = "none";
}

/**
 * save dữ liệu
 * Author: TVHieu - MF1485 (8/12/2022)
 */
function btnSaveOnclick() {
  try {
    // Thu thập dữ liệu
    const employeeName = $("#txtEmployeeName").val(); //--> bắt buộc
    const employeeCode = $("#txtEmployeeCode").val(); //--> bắt buộc
    const mobie = $("#txtEmployeeMobie").val();
    const email = $("#txtEmployeeEmail").val();
    let errorMsgs = [];
    errorFocus = [];

    // Check xem dữ liệu bắt buộc đã nhập chưa
    if (!employeeCode) {
      errorMsgs.push("Số hiệu cán bộ không được phép để trống");
      $("#txtEmployeeCode").addClass("input-error");
      errorFocus.push($("#txtEmployeeCode"));
      $("#txtEmployeeCode").hover(showError1);
    } else {
      $("#txtEmployeeCode").removeClass("input-error");
    }
    if (!employeeName) {
      errorMsgs.push("Họ và tên không được phép để trống");
      $("#txtEmployeeName").addClass("input-error");
      errorFocus.push($("#txtEmployeeName"));
      $("#txtEmployeeName").hover(showError2);
    } else {
      $("#txtEmployeeName").removeClass("input-error");
    }
    //Clear error msg
    document.querySelector(".toast-message-content").innerHTML = "";
    // Kiểm tra errorMsgs xem có lỗi không
    if (errorMsgs.length > 0) {
      // Nếu có lỗi thì hiển thị ra dialog báo lỗi
      for (const errMsg of errorMsgs) {
        $(".toast-message-content").append(`<div >${errMsg}</div>`);
      }
      $(".toast-message-container").css("display", "flex");
    } else {
      $.ajax({
        type: "POST",
        url: "https://amis.manhnv.net/api/v1/Employees",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          employeeCode: `${employeeCode}`,
          employeeName: `${employeeName}`,
          email: `${email}`,
          telephoneNumber: `${mobie}`,
          departmentId: "142cb08f-7c31-21fa-8e90-67245e8b283e",
        }),
        success() {
          alert("succes");
          // document.getElementById("toastMsgSucces").style.display = "block";
        },
        error(error) {
          console.log(error);
        },
      });
    }

  } catch (error) {

  }

}

/**
 * Hàm khi điền xong thì cho ô input dialog trở về bình thường
 * Author: TVHieu - MF1485 (15/12/2022)
 */
const onValidateFieldRequired1 = function () {
  try {
    const value = $("#txtEmployeeCode").val();
    if (!value) {
      $("#txtEmployeeCode").addClass("input-error");
    } else {
      $("#txtEmployeeCode").removeClass("input-error");
      $(".dialog-el-2-error").hide();
      $("#txtEmployeeCode").hover(function () {
        $(".dialog-el-2-error").hide();
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const onValidateFieldRequired2 = function () {
  try {
    const value = $("#txtEmployeeName").val();
    if (!value) {
      $("#txtEmployeeName").addClass("input-error");
    } else {
      $("#txtEmployeeName").removeClass("input-error");
      $(".dialog-el-0-error").hide();
      $("#txtEmployeeName").hover(function () {
        $(".dialog-el-0-error").hide();
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//Hàm để hover vào input là show ra lỗi không nhập số hiệu và họ tên
const showError1 = function () {
  try {
    $(".dialog-el-2-error").toggle();
    $(".dialog-el-0").css("position", "static");
    $(".dialog-el-2").css("position", "relative");
  } catch (error) {
    console.log(error);
  }
};
const showError2 = function () {
  try {
    $(".dialog-el-0-error").toggle();
    $(".dialog-el-0").css("position", "relative");
    $(".dialog-el-2").css("position", "static");
  } catch (error) {
    console.log(error);
  }
};
