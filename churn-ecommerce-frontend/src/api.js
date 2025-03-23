import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",  // Ensure '/api' is included
  headers: { "Content-Type": "application/json" },
});

// Signup Request
export const signup = async (name, email, password) => {
  try {
    const response = await API.post("/auth/signup", { name, email, password });
    console.log("✅ Signup API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Signup API Error:", error.response?.data || error);
    throw error;
  }
};

// Login Request
export const login = async (email, password) => {
  try {
    console.log("📤 Sending Login Request:", { email, password });
    const response = await API.post("/auth/login", { email, password });
    console.log("✅ Login Successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Login API Error:", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Login failed, try again.");
  }
};

// Fetch user churn status
export const checkUserChurn = async (userId) => {
  try {
    console.log("🔍 Checking Churn Status for User:", userId);
    const response = await API.get(`/user/churn/${userId}`);
    console.log("✅ Churn Status Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error checking churn status:", error.response?.data || error);
    return null;
  }
};

// Get all inactive users (for dashboard)
export const getInactiveUsers = async () => {
  try {
    console.log("📤 Fetching Inactive Users...");
    const response = await API.get("/user/inactive");
    console.log("✅ Inactive Users Fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching inactive users:", error.response?.data || error);
    return [];
  }
};

export default API;
