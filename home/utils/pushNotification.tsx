/* eslint-disable @typescript-eslint/explicit-function-return-type */
export default function checkPageStatus() {
   if (!('Notification' in window)) {
      alert('This browser does not support system notifications!')
   } else if (Notification.permission !== 'granted') {
      void Notification.requestPermission((permission) => {
         if (permission === 'granted') {
            sendNotification()
         }
      })
   } else if (Notification.permission === 'granted') {
      sendNotification()
   }
}

function sendNotification() {
   // create a new notification
   const notification = new Notification('Notifications Enabled', {
      body:
         new Date().toISOString().replace(/T/, ' ').substr(0, 10) +
         ' ' +
         'You are now enabled to received Notifications',
      icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png'
   })

   // close the notification after 10 seconds
   setTimeout(() => {
      notification.close()
   }, 10 * 1000)

   // navigate to a URL
   notification.addEventListener('click', () => {
      window.open('https://www.javascripttutorial.net/web-apis/javascript-notification/', '_blank')
   })
}

// inactive on the tab
export function awayNotification() {
   const notification = new Notification('SBA notification', {
      body: 'You have notifications from sba',
      icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png'
   })
   notification.onclick = () => {
      notification.close()
      window.parent.focus()
   }
   // setTimeout(() => {
   notification.close()
   // }, 10 * 1000);
}
