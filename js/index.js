loadData();
createEvent();
// Load dữ liệu:
/** 
 * Lấy dữ liệu
 * Author: TVHieu - MF1485 (5/12/2022)
 * EditBy: TVHieu - MF1485 (7/12/2022) - Sửa lại Api
*/
function loadData() {
    // Gọi api lấy dữ liệu
    $.ajax({
        type: "GET",
        url: "https://amis.manhnv.net/api/v1/Employees",
        dataType: "dataType",
        success: function (response) {
            console.log(response);
            // xử lý dữ liệu
            //Hiển thị dữ liệu lên table:
            $("#tbIndexList tbody").empty();
            for (const emp of response){
            var employeeCode = emp.EmployeeCode;
            var fullName = emp["EmployeeCode"];
            var phoneNumber = emp.PhoneNumber;
            var trHTML = 
            `<tr>
            <td class="number-marin">
                    <input type="checkbox"
                    class="checkbox-table">
                </td>
                <td class="number-marin">${employeeCode}</td>
                <td class="number-left-name">${fullName}</td>
                <td class="number-marin">${phoneNumber}</td>
                <td class="number-left">Tổ Toán - Tin</td>
                <td class="number-left">Toán</td>
                <td class="number-left">Phòng tin học</td>
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
            $("#tbEmployeeList tbody").append(trHTML);
            }
        },
        error: function(error){
            console.log(error);
        }
    });

    // Hanlde lỗi từ Api (nếu có)

}
//Lập trình cho các sự kiện:
function createEvent() {

}
//1 Bấm vào nut thêm hiển thị dialog nhập thông tin chi tiết.
//2 Chuyển trang paging:
//..........