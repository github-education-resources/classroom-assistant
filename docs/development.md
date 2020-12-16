
# Installing for Development

A local version is simple to set up:

```sh
git clone https://github.com/education/classroom-assistant
cd classroom-assistant
script/setup
```

Once installed, run the application with

```
script/run
```

## Building

You can build Classroom Assistant into executables by running

```
script/package
```

Please follow platform-specific instructions below:

### MacOS

Building for MacOS requires an [Apple Developer ID certificate](https://developer.apple.com/developer-id/).
Once obtained and installed on your machine, reference the identity as the
`CLASSROOM_ASSISTANT_OSX_DEVELOPER_ID` environment variable. This can be done by
adding the following line to your `.bashrc`:

```sh
export CLASSROOM_ASSISTANT_OSX_DEVELOPER_ID="<your developer identity>"
```

You can retrieve a list of developer identities available in your keychain by running:

```
security find-identity -p codesigning
```

Do this and all will be well

