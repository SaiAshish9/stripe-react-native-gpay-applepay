import React, {useState, useEffect} from 'react';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';

const API_URL = 'https://e5c1ca9262ac.ngrok.io';

function App() {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setSecret] = useState(null);

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(`${API_URL}/pay`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const {paymentIntent, ephemeralKey, customer} = await response.json();

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (e) {}
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();

    const data = await initPaymentSheet({
      applePay: true,
      merchantCountryCode: 'US',
      googlePay: true,
      testEnv: true,
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    });
    console.log(data);
    setSecret(paymentIntent);
  };

  const openPaymentSheet = async () => {
    try {
      const {error} = await presentPaymentSheet({clientSecret});

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        Alert.alert('Success', 'Your order is confirmed!');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <StripeProvider publishableKey="" merchantIdentifier="">
      <View style={styles.container}>
        <TouchableOpacity onPress={openPaymentSheet}>
          <Text style={styles.text}>
            {loading && clientSecret ? 'Loading...' : 'Pay'}
          </Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
  },
});

export default App;
