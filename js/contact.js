/* ============================================================
   Sweet Gypsy Design — Contact Form Handler (Legacy FormSubmit)
   Depends on: i18n.js (i18n, currentLang)
   NOTE: This handler is currently disabled in favor of web3forms.js
   ============================================================ */

/* ─── CONTACT FORM & ANTI-SPAM ─── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusMsg = document.getElementById('form-status-msg');
  const submitBtn = document.getElementById('btn-submit');
  if (!form || !statusMsg || !submitBtn) return;

  // Rate Limiter: Max 3 messages per 24 hours
  const MAX_MSGS = 3;
  const TIME_FRAME = 24 * 60 * 60 * 1000; // 24 hours in ms

  function checkRateLimit() {
    const history = JSON.parse(localStorage.getItem('contactFormHistory') || '[]');
    const now = Date.now();
    // Filter history to only include messages from the last 24 hours
    const recent = history.filter(time => now - time < TIME_FRAME);
    return recent.length < MAX_MSGS;
  }

  function recordSubmission() {
    const history = JSON.parse(localStorage.getItem('contactFormHistory') || '[]');
    const now = Date.now();
    const recent = history.filter(time => now - time < TIME_FRAME);
    recent.push(now);
    localStorage.setItem('contactFormHistory', JSON.stringify(recent));
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Check honeypot
    const honey = form.elements['_honey']?.value;
    if (honey) {
      // Bot filled the hidden field, silently reject
      statusMsg.style.display = 'block';
      statusMsg.style.backgroundColor = '#d4edda';
      statusMsg.style.color = '#155724';
      statusMsg.textContent = 'Message sent successfully!'; // Fake success for bots
      return;
    }

    if (!checkRateLimit()) {
      statusMsg.style.display = 'block';
      statusMsg.style.backgroundColor = '#f8d7da';
      statusMsg.style.color = '#721c24';
      const t = i18n[currentLang];
      statusMsg.textContent = t ? (t.form_limit_error || 'You have reached the daily limit for sending messages. Please try again tomorrow.') : 'You have reached the daily limit for sending messages. Please try again tomorrow.';
      return;
    }

    const formData = new FormData(form);

    // Disable button to prevent double submit
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    statusMsg.style.display = 'none';

    fetch('https://formsubmit.co/ajax/diffunnogoodguy1945@gmail.com', {
      method: 'POST',
      body: formData
      // ห้ามใส่ headers ใด ๆ ทั้งสิ้น ปล่อยโล่งแบบนี้เลยครับ เบราว์เซอร์จะจัดการส่งคู่ FormData ให้เอง
    })
      .then(response => {
        if (!response.ok) {
          // ถ้าเซิร์ฟเวอร์ตอบกลับมาว่าไม่ผ่าน (เช่น URL ผิด หรือไม่มีข้อมูล) ให้โยนข้อผิดพลาดออกไป
          throw new Error('เซิร์ฟเวอร์ปฏิเสธการส่งข้อมูล');
        }
        return response.json();
      })
      .then(data => {
        if (data.success === 'true' || data.success === true) {
          statusMsg.style.display = 'block';
          statusMsg.style.backgroundColor = '#d4edda';
          statusMsg.style.color = '#155724';
          statusMsg.textContent = 'ส่งข้อมูลสำเร็จแล้ว! สังเกตกล่องข้อความอีเมลของคุณเพื่อกดยืนยัน (Activate) ครั้งแรกด้วยนะคะ';
          form.reset();
          recordSubmission();
        } else if (data.message && data.message.toLowerCase().includes('activation')) {
          // ── Formsubmit ต้องการ Activate ครั้งแรก (ปกติ ไม่ใช่ error) ──
          statusMsg.style.display = 'block';
          statusMsg.style.backgroundColor = '#fff3cd';
          statusMsg.style.color = '#856404';
          statusMsg.innerHTML = '📧 <strong>เหลืออีก 1 ขั้นตอน!</strong><br>ระบบส่งอีเมลยืนยันไปแล้ว กรุณาเปิดอีเมลแล้วกดปุ่ม <strong>"Activate Form"</strong><br>หลังจากนั้นฟอร์มจะใช้งานได้ตลอดเลยค่ะ!';
        } else {
          throw new Error('Server returned false');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        statusMsg.style.display = 'block';
        statusMsg.style.backgroundColor = '#f8d7da';
        statusMsg.style.color = '#721c24';
        statusMsg.textContent = 'เกิดข้อผิดพลาด: มีปัญหาบนหน้าเว็บ ไม่สามารถส่งข้อมูลได้ กรุณาเช็กชื่อคอลัมน์และอินเทอร์เน็ต';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
  });
}
