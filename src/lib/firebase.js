import admin from 'firebase-admin';

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: 'cd2021-daf02',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDZc8/MdLXv6wqk\nIzkV7tKVnMxoypeD1W0dAmmOtFvcsFD7oh97l9c+mbSyNYjO1eS8iG7ktu6IBZ8R\nWXgZRa2Kgf2o3L/M7AkVqTkQG71NwTnHyB8sCT/LwBPyNSeZJOjjmHvIoZI9qNbM\ni4X8h6dPdbKHpGUxnkB0iP2A5xU7oxU18otspCm6pYbOfZ1ztOu3Z+kETo1Rku4J\nuC6gL8s7KvwIr+c/FJ+87siaUFE2T6XMXg4F56MhdqdxM/tK6ofxhmmTHV/V6IQ8\nWli2CqWW6Civ6dYT0q2LfV+5s/Pn9pZci3ZE0I7VDk/mNz4AHBiD7YJ5AlWzpS8Q\nIXoIXmobAgMBAAECggEAC5zvwA+Ll+CJlPJ8nfs/K9ZP5FjNdrDzPtVeJczkCwkv\nigDChas6R5GV4N6TC9jIenke0wAiBQmn0RliHJdoCTmf/mCrrZn9cjazYXTZy0lC\neLTrVUK5MXx0lD7aeodKGL2P/ssCMGDP9+SLp0znVosGmc/hx6CX+KFISJYOwDyA\nKWJd0Fo6QoEcLb2yMU0SKcy++FplRTh82aokHdZvXSiWLNaYIYIpsRq/i9oz8XNj\nxPMTG6sO78Dks+TtNt9WMOL29+GJQaG4w7JBqWjOYe9TAs8HqAdRVo49AmM8TdGz\nKXZEeRNDCPFGZ3GzJaamiH7IZlOy4O5VKoywDvfsgQKBgQD7Kaz42GJ6fLICGZ30\nIFkFyEwBE7yCFpzC+zHS/jb/Op4e61pghA3crujGM2qlmF+UsMfFMAsxKY90nK2D\n2chNO1moF5hrPmsV23RfaLK1IiSuK5uee2pD9FhaTpSjIR8ckAZGaO2FSEp9RY/w\nSXZSdVjfNZta+7Ik8a+KjzW+8QKBgQDdo+5x56LrdUsX9Dl8V80pmcIHv+dbIWEZ\nDW2m0zrUhDYEzNIXQNs6L1gsonQq6S1q5wI9OXgx+20ps+4/k1MC0Gv2OtL9Ix8M\nQ2uUY7DlbjPBv4xaxdTbQ4AK7ngPdMZvU+BT5K7zl5FBdaNPhDGb/Tj/V5UeEtm5\nmOWaXDIRywKBgGGSizQRPBDBqJXQReC1QGBSs9QnSrBvAG9vDqgdQlhc+VihrfaY\n1pnJCX0WNHQogdlN5A3i4DY1Ixn2VCJI1NvMFsSKhhgDo65WFxuJnQNpRD61ijtD\nTsEfh8Nti6jkESYTfZyU3tFMiEOqZoS+xUy7cc8lEDmEVmyrx7pYcFTBAoGAYSb1\nYxps8Jb2dqaH+DgoZx7NzUXSLMEB5dBcCy8172eQoiQBx02XivaryMzg7NpPHTfr\nZFjnlckm/YuwWE/EqEwhtsnsKCeX+XEoG+Bi7v6SU1AaPsPO3NnGq4QCPowqWyxB\n/aQVCBOdCTt+fWFtuXmS3WJPq+IJa/BYXIQjMmcCgYBQg6Agy8rv+5RiRtGjMOO4\nTJJkTOdisjY4KyOTK5Q3GWZZf0Mcb96xxNcPjZIljY3PYvCbvHq2BiYdmDtmogK9\nBZMfqfRFReQuaISW5RCd90x9rCQV6ew8UligLn3Wby+mkm/xO4B2qEhcfaVE23eI\nN8N54si2AqVo53M3WxYt7Q==\n-----END PRIVATE KEY-----\n',
      client_email:
        'firebase-adminsdk-1rx9t@cd2021-daf02.iam.gserviceaccount.com',
    }),
    databaseURL: 'https://cd2021-daf02.firebaseio.com',
  });
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    // eslint-disable-next-line no-console
    console.error('Firebase admin initialization error', error.stack);
  }
}

export default admin.firestore();
