# Managing npm packages and libraries

## Package version

```
"slugify": "^1.6.5"
```
1 ➼ major versions(huge new release that can have breaking changes)

6 ➼ major versions (huge new release that can have breaking changes) minor version(new features are added to teh package without breaking changes (old still work)

7 ➼ -batch version (for fixing bugs) 

## Updating Packages
^ ➼ which is by default means that we accept only minor and batch updates 
~ ➼ accept only batch releases
* ➼ automatically upgrade packages including major and minor and batch versions [Not Recommended] 

#### Check if updates are available

```
npm outdated
```

#### Download (slugify) with a specific version

```
npm install slugify@1.0.0
```

#### Update (slugify)

```
npm update slugify
```

## Deleting packages

```
npm uninstall express 
```


✎ Package-lock.json includes version no. of your dependencies and dependencies of dependencies

