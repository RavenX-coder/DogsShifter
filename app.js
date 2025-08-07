// 初始化 Firebase
const firebaseConfig = {
  apiKey: "你的apiKey",
  authDomain: "你的authDomain",
  projectId: "你的projectId",
  storageBucket: "你的storageBucket",
  messagingSenderId: "你的messagingSenderId",
  appId: "你的appId"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);

// 獲取 Firestore 實例
const db = firebase.firestore();

// 表單提交處理
document.getElementById('messageForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const messageInput = document.getElementById('messageInput');
  
  try {
    // 添加新文件到 "messages" 集合
    await db.collection('messages').add({
      text: messageInput.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    messageInput.value = '';
  } catch (error) {
    console.error("寫入錯誤: ", error);
  }
});

// 即時監聽 messages 集合變化
db.collection('messages')
  .orderBy('timestamp', 'desc')
  .onSnapshot((snapshot) => {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';
    
    snapshot.forEach((doc) => {
      const li = document.createElement('li');
      li.textContent = doc.data().text;
      messageList.appendChild(li);
    });
  });
