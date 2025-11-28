# Firebase App Hosting - Add Secret

You need to add the Firebase private key as a secret in the Firebase Console:

1. Go to: https://console.firebase.google.com/project/getworken-b6f27/apphosting
2. Click on your `getworken` backend
3. Go to "Secrets" tab
4. Click "Add Secret"
5. Name: `FIREBASE_PRIVATE_KEY`
6. Value: (paste the full private key from .env.local, including the -----BEGIN PRIVATE KEY----- and -----END PRIVATE KEY-----)
7. Make it available for: BUILD and RUNTIME
8. Click "Save"

The private key from your .env.local is:

```
-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC3WkEu5zMOaaTD
3QvPTEDG4wguF7KAOQ5gL6YAPLZ8TyR9XKRf8pxKWKLzDoxCTP/YUtlJDMmYvkGX
MV/c0BMyjjVXaMoBSQgXm/Xp/A7e1PoSE7YOqLx+aU4TRvR2IGG2mykT4oZTojtu
Dv90kt74lXQ5nba2kpea+7ChHwewxHylKdoUtr4jkmKEDhUdRtEslcAJqpQp6NDa
n8KXoM+eUy32OqfVWUAq1/kHYZqvErNUkWelB8LhcU1XKg4ymO6wgGswt+2nhuFJ
j9vdQcLursY5fPH7hlwFETW8h0MxAhvrETy+dgCu0ZF+vg7iPZCs1oyXnYYxSydP
LuqpOeZNAgMBAAECggEAA9whjSmO2JnUFHooen0MzA28KVmUXMCsEyL4UqmfNIS8
rEBGsZe7lJEYdRd0T8er3H5PVrYEicj6O9hClV/IAljIugYEYqc1RWdMyQKRFD3V
jzXdBPf7vTQy/D2SfejL8HqEZd0Z837HKNel/GqZyQ/puiDI15UZyJ3N0nEtye8q
ihjxu44m3AOGag9bb7s98IMZo+TK8jSBGnagXVgVDNtXJcAOP+BFZWhYrdU/2Oml
uxsuSQyT6biFwFLwM0jss7olykUUi6B4vdmAy4yNI8QF5RRvLeWlKJcJVy8f59/0
kz3Yrj0yg6t3Da7wzPiMm97T+ooPO5EA4PAMQdC7HQKBgQDdolzJBRQ//+fioUVx
ocoZGF4kj4SgmIYepCPn9nOSAydduBEnVbgarnXVvtdYtQey3dxjvfpCoAOqHY7E
yJXUmS2Z4CHMNLsnyWrL3T62uUH0jIKB4U/0e5WbSxynOp/tPsZgJEnwd0oMGUg4
KVNOArw0mm3tHtBYKx6QE7KOVwKBgQDTyFMBQiBYAjH/MJKNA55NniMLbZL2Six1
LBTH5PGqyK7AJRMshJrJgvy/m83rerlsz1sC/nUrdvjWd0R5jeyXN8LbYX7ouU1r
Qv2q7SUfkivA1U5CZSVycORUU0VL7YC3BGnNL4CY3qddGp9AMbTWaOSfmxVqYen+
9l6uufYB+wKBgQCmRvl1lunqWgOOc4+2ALuuuClpJINMOSHmOx71GGD8WoFePoog
CJ9m5RxikBrf4nE0MF74Nb9b3NDi/+nsmNBP/9vGZfD1U1pWLzaAXCyAydxBrGj9
KBzkPxOuvltw2vrA8yfBWXhfgB99lDoqaFanYEXy8SknjMaiXzc+wIhlYQKBgQCg
kdzlMlbFg3yWyCQFCH5IySI28vAfDiPg/vgOivX0D8323uVHto6JRGgPerjI1jaq
WhjeD0GVH9IRAUKIiuObz2pM3QHUv1IEhjlAFCc2ZaQIw3Ffg8K9nvxvNuduZvdV
S+JP8LkmroHkZF/j0wwSGFtm67V0ACLi7bbh8RqlawKBgQCQZGy7VHnNcIfkJAKc
GjUUsN+WgcGi3CSAO85qELFAAEjZOvABUhnX0rdKGUt+hbSu0zDVqFoCehldI4Hf
HIg0IldTO/wd6YLs0I9oNy2Nhn6krIMQtBnuWdTwxeHvIQa6/AsHdXX+pneP2w34
/O9MfnPEij2uLZXtH/I9x0xcwA==
-----END PRIVATE KEY-----
```

After adding the secret, Firebase will automatically trigger a new build and deployment.
