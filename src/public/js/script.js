/*-------------------------Menu-hover--------------------------*/
document.addEventListener("DOMContentLoaded", function () {
    const allNavItems = document.querySelectorAll("#navbar li"); // Tất cả các mục trong navbar
    const overlay = document.querySelector(".fullscreen-overlay"); // Lớp phủ
    const dropdown = document.querySelector(".display-none"); // Menu con

    let productItem = null; // Biến lưu trữ mục "Products"
    let isHovering = false; // Trạng thái để kiểm soát hover

    // Tìm mục chứa chữ "Products"
    allNavItems.forEach((item) => {
        if (item.textContent.trim() === "Products") {
            productItem = item;
        }
    });

    if (!productItem) {
        console.error("Không tìm thấy mục 'Products'.");
        return;
    }

    // Hiển thị lớp phủ và menu con
    const showDropdown = () => {
        isHovering = true;
        overlay.style.display = "block";
        dropdown.style.display = "grid"; // Hiển thị menu con
    };

    // Ẩn lớp phủ và menu con
    const hideDropdown = () => {
        setTimeout(() => {
            if (
                !productItem.matches(":hover") &&
                !overlay.matches(":hover") &&
                !dropdown.matches(":hover")
            ) {
                isHovering = false;
                overlay.style.display = "none";
                dropdown.style.display = "none";
            }
        }, 200); // Độ trễ 200ms
    };

    // Sự kiện hover cho Products
    productItem.addEventListener("mouseenter", showDropdown);
    productItem.addEventListener("mouseleave", hideDropdown);

    // Thêm sự kiện hover cho lớp phủ và menu con
    overlay.addEventListener("mouseleave", hideDropdown);
    dropdown.addEventListener("mouseleave", hideDropdown);

    // Sự kiện click vào Products để chuyển trang
    productItem.querySelector("a").addEventListener("click", (e) => {
        // Điều hướng sang trang Product
        window.location.href = "/product";
    });

    // Trường hợp đã ở trang /product, cho phép hover
    if (window.location.pathname === "/product") {
        productItem.addEventListener("mouseenter", showDropdown);
        productItem.addEventListener("mouseleave", hideDropdown);
    }
});
/*---------------------------------------------------*/

/*---------------------Account-page------------------*/
// Lấy các phần tử cần thiết
const loginForm = document.getElementById('LoginForm');
const regForm = document.getElementById('RegForm');
const indicator = document.getElementById('Indicator');

// Hàm để chuyển sang form Login
function switchToLogin() {
    loginForm.style.transform = 'translateX(0)';
    regForm.style.transform = 'translateX(300px)';
    indicator.style.transform = 'translateX(0)'; // Gạch chân di chuyển về Login
}

// Hàm để chuyển sang form Register
function switchToRegister() {
    loginForm.style.transform = 'translateX(-300px)';
    regForm.style.transform = 'translateX(0)';
    indicator.style.transform = 'translateX(100%)'; // Gạch chân di chuyển về Register
}

/*----------------------------------------*/
<script>
    async function updateCartCount() {
        try {
            const response = await fetch('/cart/count');
            const data = await response.json();

            // Tìm và cập nhật số lượng sản phẩm
            const cartCountElement = document.querySelector('.cart-count');
            if (cartCountElement) {
                cartCountElement.textContent = data.totalItems || 0;
            }
        } catch (error) {
            console.error('Error updating cart count:', error);
        }
    }

    // Gọi hàm cập nhật ngay khi trang tải xong
    document.addEventListener('DOMContentLoaded', updateCartCount);

    // Gọi hàm mỗi khi thực hiện thay đổi giỏ hàng (nút update hoặc delete)
    document.querySelectorAll('.update-form, .delete-form').forEach(form => {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const action = this.action;

            try {
                // Gửi yêu cầu đến server
                await fetch(action, {
                    method: 'POST',
                    body: formData,
                });

                // Cập nhật số lượng giỏ hàng
                updateCartCount();
            } catch (error) {
                console.error('Error updating cart:', error);
            }
        });
    });
</script>