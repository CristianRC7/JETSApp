import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const EventCardSkeleton = () => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const SkeletonItem = ({ style }) => (
    <Animated.View style={[styles.skeleton, style, { opacity }]} />
  );

  return (
    <View style={styles.card}>
      <SkeletonItem style={styles.description} />
      <View style={styles.detailsContainer}>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={styles.detail}>
            <SkeletonItem style={styles.label} />
            <SkeletonItem style={styles.value} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  skeleton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  description: {
    height: 24,
    marginBottom: 16,
    width: '80%',
  },
  detailsContainer: {
    gap: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    height: 16,
    width: 80,
  },
  value: {
    height: 16,
    flex: 1,
    marginLeft: 8,
  },
});

export default EventCardSkeleton;