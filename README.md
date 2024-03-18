## Instructions
1) Run `npm run install`
2) Run `npm run init`
3) Run `npm run start`

## Testing
Since there is no signup feature, I created a user that can be used to test the login feature

```sh
email: 'admin@test.com'
password: 'adminPassword'
```

## Comments

For production ready code I would:
- Add tests
- Improve login like saving current user to local storage so data is not lost on refresh

Other features that would be essential for deployment:
- Signup
- Logout
- Consider length of jobs. It may need pagination for performance

Other nice to haves:
- Cleanup unsued code from setup
- Filter jobs by state
- Add 'apply' feature
