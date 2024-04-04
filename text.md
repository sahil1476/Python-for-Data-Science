# login.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <!-- Your CSS styles -->
</head>
<body>
<header>
    <!-- Your header content -->
</header>
    <div class="container">
        <h1>Login</h1>
         <form id="loginForm">
            <label for="email">Email:</label><br>
            <input type="text" id="email" name="email" required><br>
            <!-- No need for password input in the frontend -->
            <input type="submit" value="Login">
        </form>
    </div>
    <script>
        document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the form from submitting in the traditional way
            const email = document.getElementById('email').value; // Get the email value
            const url = "http://localhost:8080/login";
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Specify the content type
                },
                body: JSON.stringify({ email: email }) // Send email in JSON format
            })
            .then(response => response.json())
            .then(data => {
                if (data.role === "admin") {
                    window.location.href = "admin.html"; // Redirect to admin.html if role is admin
                } else if (data.role === "user") {
                    window.location.href = "user.html"; // Redirect to user.html if role is user
                } else {
                    alert("Invalid email or role");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
        });
    </script>

</body>
</html>

# go backend
package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

func main() {
    router := gin.Default()
     // Use CORS middleware to allow requests from all origins
    router.Use(cors.Default())
    // Login handler
    router.POST("/login", func(c *gin.Context) {
        var requestBody struct {
            Email string `json:"email"`
        }
        if err := c.BindJSON(&requestBody); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
       // Check if the email exists in the database and get the role
        role := getUserRole(requestBody.Email)
        if role == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid email"})
            return
        }
        // Send the role back to the frontend
        c.JSON(http.StatusOK, gin.H{"role": role})
    })
    router.Run(":8080")
}

// Dummy function to get the user role (replace it with your actual implementation)
func getUserRole(email string) string {
    // Perform database lookup or any other logic to get the user role based on the email
    // For demonstration, let's assume we have predefined roles for specific emails
    if email == "admin@example.com" {
        return "admin"
    } else if email == "user@example.com" {
        return "user"
    }
    return "" // Return empty string if email not found
}


================================================================================================================================
# send data to book details

<body>
    <div class="container">
        <h2>Add Book</h2>
        <form id="bookForm" class="form-group">
            <label for="isbn">ISBN:</label>
            <input type="number" id="isbn" name="isbn" required><br>
            <label for="libid">Library ID:</label>
            <input type="number" id="libid" name="libid" required><br>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required><br>
            <label for="authors">Authors:</label>
            <input type="text" id="authors" name="authors" required><br>
            <label for="publisher">Publisher:</label>
            <input type="text" id="publisher" name="publisher" required><br>
            <label for="version">Version:</label>
            <input type="number" id="version" name="version" required><br>
            <label for="totalcopies">Total Copies:</label>
            <input type="number" id="totalcopies" name="totalcopies" required><br>
            <label for="availablecopies">Available Copies:</label>
            <input type="number" id="availablecopies" name="availablecopies" required><br>
            <input type="submit" value="Submit">
        </form>
    </div>
    <script>
        document.getElementById("bookForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the default form submission
            // Get form data
            const formData = new FormData(this);
            // Send form data to backend using Fetch API
            fetch("http://localhost:8080/createbook", {
                method: "POST",
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("Book created successfully:", data);
                // Optionally, perform any actions after successful form submission
            })
            .catch(error => {
                console.error("Error occurred during form submission:", error);
                // Optionally, handle errors or display error messages to the user
            });
        });
    </script>
</body>


===========================================================================================
######## addbook.html
<!DOCTYPE html>
<html>
<head>
    <title>Add Book</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f0f0;
        }
        .container {
            background-color: #ab7a7a;
            padding: 20px;
            width: 50%;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 10px;
            margin-top: 10px;
        }
        .form-group input {
            width: 95%;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ddd;
        }
        .form-group {
            text-align: center;
        }
        .form-group input[type="submit"] {
            background-color: #4CAF50;
            color: #fff;
            cursor: pointer;
            margin-top: 20px;
            width: 50%;
            display: inline-block; /* Ensure the button respects the width */
        }
        .form-group input[type="submit"]:hover {
            background-color: #3e8e41;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Add Book</h2>
        <form id="bookForm" class="form-group">
            <label for="isbn">ISBN:</label>
            <input type="number" id="isbn" name="isbn" required><br>
            <label for="libid">Library ID:</label>
            <input type="number" id="libid" name="libid" required><br>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required><br>
            <label for="authors">Authors:</label>
            <input type="text" id="authors" name="authors" required><br>
            <label for="publisher">Publisher:</label>
            <input type="text" id="publisher" name="publisher" required><br>
            <label for="version">Version:</label>
            <input type="number" id="version" name="version" required><br>
            <label for="totalcopies">Total Copies:</label>
            <input type="number" id="totalcopies" name="totalcopies" required><br>
            <label for="availablecopies">Available Copies:</label>
            <input type="number" id="availablecopies" name="availablecopies" required><br>
            <input type="submit" value="Submit">
        </form>
    </div>
    <script>
        document.getElementById("bookForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the default form submission
            // Get form data
            const formData = new FormData(this);
            // Send form data to backend using Fetch API
            fetch("http://localhost:8080/createbook", {
                method: "POST",
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("Book created successfully:", data);
                // Optionally, perform any actions after successful form submission
            })
            .catch(error => {
                console.error("Error occurred during form submission:", error);
                // Optionally, handle errors or display error messages to the user
            });
        });
    </script>
</body>
</html>

================================================================================================================

######updatbook.html #####

<!DOCTYPE html>
<html>
<head>
    <title>Update Book</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f0f0;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            width: 100%;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 10px;
        }
        .form-group input {
           padding: 10px;
            border-radius: 5px;
            border: 1px solid #ddd;
            width: 97%;
        }
        .form-group {
            display: flex;
            flex-direction: column;
            align-items: center; /* Center the form vertically */
        }      
        .form-group input[type="submit"] {
            background-color: #4CAF50;
            color: #fff;
            cursor: pointer;
            margin-top: 30px;
            width: 60%;
        }
        .form-group input[type="submit"]:hover {
            background-color: #45c84a;      
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Update Book</h2>
        <form id="updateBookForm" class="form-group">
            <label for="isbn">ISBN:</label>
            <input type="number" id="isbn" name="isbn" required><br>
            <input type="submit" value="Submit">
        </form>
    </div>
    <script>
        document.getElementById("updateBookForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the default form submission            
            const isbn = document.getElementById("isbn").value; // Get the value of the ISBN input field
                        // Send a POST request to the backend API endpoint
            fetch("http://localhost:8080/updatebook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ isbn: isbn }) // Convert the ISBN to JSON format
            })
            .then(response => response.json())
            .then(data => {
                console.log("Book updated successfully:", data);
                // Optionally, perform any actions after successful form submission
            })
            .catch(error => {
                console.error("Error occurred during form submission:", error);
                // Optionally, handle errors or display error messages to the user
            });
        });
    </script>
</body>

</html>
