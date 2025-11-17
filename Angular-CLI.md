## Component Creation

In Angular v19+, you can create a new component using the Angular CLI command:

```sh
ng generate component component-name
```

or the shorthand version:

```sh
ng g c component-name
```

Examples

If you want to create a component named user-profile:

```sh
ng g c user-profile
```

### Common useful options:

|Option|Description|Example|
|-|-|-|
|--skip-tests|	Do not generate .spec.ts file|	ng g c user-profile --skip-tests|
|--inline-style|	Inline the component’s styles|	ng g c user-profile --inline-style|
|--inline-template|	Inline the template in the .ts file|	ng g c user-profile --inline-template|
|--standalone|	Create a standalone component (recommended in Angular ≥15)|	ng g c user-profile --standalone|
|--path	|Specify the directory|	ng g c shared/components/user-profile|


Example for standalone component:
```sh
ng g c user-profile --standalone --skip-tests
```