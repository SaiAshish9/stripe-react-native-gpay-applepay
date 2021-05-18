## AndroidManifest.xml

```
<application>
  ...
  <meta-data
    android:name="com.google.android.gms.wallet.api.enabled"
    android:value="true" />
</application>
android/app/build.gradle
```
 
## android/app/build.gradle

```
dependencies {
  implementation 'com.google.android.gms:play-services-wallet:18.1.1'
  implementation 'androidx.appcompat:appcompat:1.2.0'
  implementation 'com.stripe:stripe-android:16.8.2'
  ...
}
```
