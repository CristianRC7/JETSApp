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
      {renderSkeletonItem('80%', 24, 16)}
      <View style={styles.detailsContainer}>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={styles.detail}>
            {renderSkeletonItem(80, 16)}
            {renderSkeletonItem('100%', 16, 0)}
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
    marginRight: 8,
  },
  detailsContainer: {
    gap: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default EventCardSkeleton;