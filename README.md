# etc

ETC is a link shortening app, running in a canister

Roadmap: 

- [ ] Hits for links
- [ ] Manage links you've created
- [ ] Login / dashboard
- [ ] CRM functionality / tracking
- [ ] Private links
- [ ] Vanity links
- [ ] Motoko library
- [ ] Rust library
- [ ] JS library


## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:8000?canisterId={asset_canister_id}`.
