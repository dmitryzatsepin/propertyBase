// src/features/LocationImport/components/ExcelDropzone.tsx
import React from 'react';
import { Box, Group, Text, Stack, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES, FileWithPath } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import { useMantineColorScheme } from '@mantine/core';

interface ExcelDropzoneProps {
  uploadedFile: File | null;
  onFileDrop: (file: File | null) => void;
  isLoading?: boolean;
}

export const ExcelDropzone: React.FC<ExcelDropzoneProps> = ({
  uploadedFile,
  onFileDrop,
  isLoading,
}) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const handleDrop = (files: FileWithPath[]) => {
    if (files.length > 0) {
      onFileDrop(files[0]);
    } else {
      onFileDrop(null);
    }
  };

  const handleReject = () => {
    console.error('File rejected by Dropzone. Check type or size.');
    onFileDrop(null);
  };

  return (
    <Stack gap="xs">
      <Text size="sm" fw={500}>
        Upload Excel File (.xlsx, .xls)
      </Text>
      <Dropzone
        onDrop={handleDrop}
        onReject={handleReject}
        maxSize={30 * 1024 ** 2}
        accept={[MIME_TYPES.xls, MIME_TYPES.xlsx]}
        loading={isLoading}
        disabled={isLoading}
        multiple={false}
        data-testid="file-dropzone"
      >
        <Group justify="center" gap="xl" style={{ minHeight: 120, pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconDownload size={50} color={theme.colors[theme.primaryColor][6]} stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconCloudUpload
              size={50}
              color={colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7]}
              stroke={1.5}
            />
          </Dropzone.Idle>
          <Box>
            <Text size="xl" inline>
              {uploadedFile ? 'File selected' : 'Drag file here or click to select'}
            </Text>
            {uploadedFile ? (
              <Text size="sm" color="dimmed" inline mt={7} data-testid="uploaded-file-name-dropzone">
                {uploadedFile.name} - Click or drag again to change
              </Text>
            ) : (
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach a single Excel file (.xls, .xlsx), up to 30mb
              </Text>
            )}
          </Box>
        </Group>
      </Dropzone>
    </Stack>
  );
};