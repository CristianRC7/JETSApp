import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const DateFilterButton = ({ label, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.filterButton, isActive && styles.activeFilterButton]}
      onPress={onPress}
    >
      <Text style={[styles.filterButtonText, isActive && styles.activeFilterButtonText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeFilterButton: {
    backgroundColor: '#cf152d',
    borderColor: '#cf152d',
    shadowOpacity: 0.2,
    elevation: 4,
  },
  filterButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#454545',
    textAlign: 'center',
  },
  activeFilterButtonText: {
    color: '#ffffff',
  },
});

export default DateFilterButton;