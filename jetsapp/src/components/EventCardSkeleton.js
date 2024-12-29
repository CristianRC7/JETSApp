import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const EventCardSkeleton = () => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);

  const AnimatedView = Animated.createAnimatedComponent(View);

  const renderSkeletonItem = (width, height, marginBottom = 0) => (
    <AnimatedView
      style={[
        styles.skeleton,
        { width, height, marginBottom },
        { opacity: pulseAnim },
      ]}
    />
  );

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {renderSkeletonItem(80, 16)}
        {renderSkeletonItem('60%', 16)}
      </View>
      <View style={styles.detailsContainer}>
        {[...Array(3)].map((_, index) => (
          <View key={index} style={styles.detail}>
            {renderSkeletonItem('15%', 16)}
            {renderSkeletonItem('80%', 16, 4)}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    marginBottom: 16,
    flexDirection: 'column',
    gap: 8,
  },
  skeleton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
  detailsContainer: {
    gap: 12,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default EventCardSkeleton;
